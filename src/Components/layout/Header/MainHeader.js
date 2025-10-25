"use client";

import { useState, useEffect } from "react";
import styles from "../Header/MainHeader.module.css";
import MobileMenu from "../Header/MobileMenu";
import AccountMenu from "../../templates/AccountMenu";
import AuthForm from "@/Components/templates/authForm";
import { useGetUserData } from "@/core/services/queries";

function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { data } = useGetUserData();

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data]);

  return (
    <>
      <div className={styles.header}>
        <img
          src="/image/hamber.svg"
          alt="menu"
          className={styles.hamberLogo}
          onClick={() => setIsMenuOpen(true)}
        />

        <img
          src="/image/svg/HeaderWebSVG/Torino.svg"
          alt="torino"
          className={styles.torinoSvg}
        />

        <div className={styles.navbarContainer}>
          <ul className={styles.navbar}>
            <li>صفحه اصلی</li>
            <li>خدمات گردشگری</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
          </ul>
        </div>

        {user ? (
          <AccountMenu user={user} setUser={setUser} />
        ) : (
          <AuthForm setUser={setUser} />
        )}
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default MainHeader;
