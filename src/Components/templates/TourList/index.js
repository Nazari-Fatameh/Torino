import Link from "next/link";
import React from "react";
import styles from "./TourList.module.css";
import Image from "next/image";
import { calculateTourDuration } from "../../../helper/tourDates";
import { toPersianNumber } from "../../../helper/convertNumbers";
import { fleetVehicleToPersian } from "../../../helper/convertfleetVehicleMap";
function TourList({ tourData }) {
  if (!tourData?.length)
    return <p className={styles.notFoundTour}>متاسفانه تور جدیدی یافت نشد</p>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>همه تورها</h1>
      <main className={styles.container}>
        {tourData.map((tour) => {
          const { days, startMonthName } = calculateTourDuration(
            tour.startDate,
            tour.endDate
          );

          const formattedPrice = toPersianNumber(tour.price.toLocaleString());

          return (
            <section key={tour.id} className={styles.card}>
              <Image
                src={tour.image}
                width={278}
                height={159}
                alt={tour.title}
                className={styles.imageCard}
              />

              <h5 className={styles.cardTitle}>{tour.title}</h5>

              <div className={styles.tourSummary}>
                <span className={styles.summaryText}>
                  {`${startMonthName} . ${toPersianNumber(
                    days
                  )} روزه -
           ${fleetVehicleToPersian(tour.fleetVehicle)} - ${tour.options.join(" - ")}`}
                </span>
              </div>

              <div className={styles.bottom}>
                <Link href={`/tours/${tour.id}`}>رزرو</Link>
                <div>
                  <span className={styles.price}>{formattedPrice} </span>
                  <span className={styles.toman}>تومان</span>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default TourList;
