import Image from "next/image";
import styles from "./page.module.css";
import ContactSection from "@/Components/sections/ContactSection";
import SliderSection from "@/Components/sections/SliderSection";
import OptionSection from "@/Components/sections/optionSection";
import TourList from "@/Components/templates/TourList";
import { serverFetch } from "@/core/services/http";
import SearchForm from "@/Components/templates/SearchForm";

export default async function Home({ searchParams }) {
  const data = await serverFetch("/tour", searchParams, { cache: "no-store" });

  console.log(data);
  return (
    <div>
      <div className={styles.imageContainer}>
        <Image
          src="/image/backPic.png"
          alt="picture"
          fill
          className={styles.backPicture}
        />{" "}
        <Image
          src="/image/backPicWeb.jpg"
          alt="picture"
          fill
          className={styles.backPictureWeb}
        />
      </div>
      <div className={styles.mainTitle}>
        <span> تورینو</span>
        <p> برگزار کننده بهترین تور های داخلی و خارجی</p>
      </div>

      <SearchForm />
      <TourList tourData={data} />
      <ContactSection />
      <SliderSection />
      <OptionSection />
    </div>
  );
}
