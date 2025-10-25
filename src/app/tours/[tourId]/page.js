import { serverFetch } from "@/core/services/http";
import Image from "next/image";
import { calculateTourDuration } from "@/helper/tourDates";
import { toPersianNumber } from "@/helper/convertNumbers";
import { cityToPersian } from "@/helper/convertCityMap";
import { fleetVehicleToPersian } from "@/helper/convertfleetVehicleMap";
import styles from "@/Components/templates/TourDetails/TourDetails.module.css";
import ReserveButton from "@/Components/atoms/ReserveButton";

async function TourDetails({ params }) {
  const tour = await serverFetch(`/tour/${params.tourId}`, null, {
    cache: "no-store",
  });

  const {
    title,
    image,
    startDate,
    endDate,
    price,
    fleetVehicle,
    availableSeats,
    insurance,
    origin,
  } = tour;

  const { days, nights, startDatePersian, endDatePersian } =
    calculateTourDuration(startDate, endDate);

  const formattedPrice = toPersianNumber(price.toLocaleString());
  const availableSeat = toPersianNumber(availableSeats.toLocaleString());

  return (
    <div className={styles.container}>
      <div className={styles.divDetails}>
        <Image
          src={image}
          width={400}
          height={265}
          alt={title}
          className={styles.picturTour}
        />

        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.day}>
            {toPersianNumber(days)} روز و {toPersianNumber(nights)} شب
          </p>

          <div className={styles.tourOption}>
            <span>
              <img src={"/image/svg/detailSVG/user.svg"} alt="tour leader" />
              تور لیدر از مبدا
            </span>
            <span>
              <img src={"/image/svg/detailSVG/map.svg"} alt="tour plan" />
              برنامه سفر
            </span>
            <span>
              <img src={"/image/svg/detailSVG/medal.svg"} alt="quality" />
              تضمین کیفیت
            </span>
          </div>

          <div className={styles.priceRow}>
            <p className={styles.price}>
              <span className={styles.numberPrice}>{formattedPrice}</span>{" "}
              <span className={styles.toman}>تومان</span>
            </p>
            <ReserveButton
              tourId={params.tourId}
              className={styles.buyButton}
            />
          </div>
        </div>
      </div>

      <div className={styles.tourProperty}>
        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/routing.svg" alt="origin" />
            <span className={styles.propertyLabel}>مبدا</span>
          </div>
          <span className={styles.propertyValue}>
            {cityToPersian(origin.name)}
          </span>
        </div>

        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/calendar.svg" alt="start date" />
            <span className={styles.propertyLabel}>تاریخ رفت</span>
          </div>
          <span className={styles.propertyValue}>{startDatePersian}</span>
        </div>

        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/calendar2.svg" alt="end date" />
            <span className={styles.propertyLabel}>تاریخ برگشت</span>
          </div>
          <span className={styles.propertyValue}>{endDatePersian}</span>
        </div>

        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/bus.svg" alt="fleet vehicle" />
            <span className={styles.propertyLabel}>حمل و نقل</span>
          </div>
          <span className={styles.propertyValue}>
            {fleetVehicleToPersian(fleetVehicle)}
          </span>
        </div>

        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/profile.svg" alt="available seats" />
            <span className={styles.propertyLabel}>ظرفیت</span>
          </div>
          <span className={styles.propertyValue}>{availableSeat}</span>
        </div>

        <div className={styles.propertyItem}>
          <div>
            <img src="/image/svg/detailSVG/security.svg" alt="insurance" />
            <span className={styles.propertyLabel}>بیمه</span>
          </div>
          <span className={styles.propertyValue}>
            {insurance ? "دارد" : "ندارد"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
