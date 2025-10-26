"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../Header/MobileMenu.module.css";

export default function MobileMenu({ isOpen, onClose }) {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const menuItems = [
    { label: "صفحه اصلی", icon: "/image/svg/HeaderMobileSvg/home-2.svg", id: "home" },
    { label: "خدمات گردشگری", icon: "/image/svg/HeaderMobileSvg/airplane-square.svg", id: "services" },
    { label: "درباره ما", icon: "/image/svg/HeaderMobileSvg/volume-low.svg", id: "about" },
    { label: "تماس با ما", icon: "/image/svg/HeaderMobileSvg/call.svg", id: "contact" },
  ];

  const handleClick = (item) => {
    if (item.id === "home") {
      
      router.push("/");
      onClose();
    } else {
      
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActive(item.id);
        onClose();
      }
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={active === item.id ? styles.active : ""}
              onClick={() => handleClick(item)}
            >
              <img src={item.icon} alt={item.label} className={styles.menuIcon} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
