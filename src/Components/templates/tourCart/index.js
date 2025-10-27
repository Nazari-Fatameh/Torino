import styles from "../../../Components/templates/tourCart/TourCart.module.css";
import Image from "next/image";

import { toPersianNumber, convertToRial } from "../../../helper/convertNumbers";
import { fleetVehicleToPersian } from "../../../helper/convertfleetVehicleMap";
import { cityToPersian } from "../../../helper/convertCityMap";
import { randomDigit } from "../../../helper/convertNumbers";
import { calculateTourDuration } from "../../../helper/tourDates";

function TourCart({ tour }) {
  const today = new Date();
  const duration = calculateTourDuration(tour.startDate, tour.endDate);

  return (
    <div className={styles.container}>
      <div className={styles.cardContent}>
        {new Date(tour.endDate) < today ? (
          <p className={styles.statusEnded}>به اتمام رسیده</p>
        ) : (
          <p className={styles.statusOngoing}>در حال برگزاری</p>
        )}

        <div className={styles.headerSection}>
          <div className={styles.tourHeader}>
            <div>
              <Image
                src="/image/svg/userTour/sunF.svg"
                width={18}
                height={18}
                alt="sun"
              />
              <p>{tour.title}</p>
            </div>
            <div>
              <Image
                src={
                  tour.fleetVehicle === "Airplane"
                    ? "/image/svg/userTour/airplane.svg"
                    : tour.fleetVehicle === "SUV"
                    ? "/image/svg/userTour/ship.svg"
                    : tour.fleetVehicle === "Bus"
                    ? "/image/svg/userTour/busF.svg"
                    : tour.fleetVehicle === "Van"
                    ? "/image/svg/userTour/busF.svg"
                    : "/images/default.png"
                }
                width={18}
                height={18}
                alt={fleetVehicleToPersian(tour.fleetVehicle)}
              />
              <p>سفر با {fleetVehicleToPersian(tour.fleetVehicle)}</p>
            </div>
          </div>

          <div className={styles.timeSection}>
            <div className={styles.routeInfo}>
              <h3>
                {cityToPersian(tour.origin.name)} 
                <span>&nbsp;به&nbsp;</span>
                {cityToPersian(tour.destination.name)}
              </h3>
              <p>{duration.startDatePersian}</p>
            </div>
            <div className={styles.returnDate}>
              <h3>تاریخ برگشت</h3>
              <p>{duration.endDatePersian}</p>
            </div>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.tourNumber}>
            <p>شماره تور</p>
            <span>{toPersianNumber(randomDigit())}</span>
          </div>

          <div className={styles.verticalDivider}></div>

          <div className={styles.paymentInfo}>
            <p className={styles.amountPaid}>مبلغ پرداخت شده</p>
            <div className={styles.priceWrapper}>
              <span>{toPersianNumber(convertToRial(tour.price))}</span>
              <p>تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCart;
