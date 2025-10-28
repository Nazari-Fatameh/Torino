"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast"; 
import styles from "./AccountMenu.module.css";
import { toPersianNumber } from "../../../helper/convertNumbers";

function AccountMenu({ user, setUser }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setDropdownOpen(false);

    
    toast.success("از حساب کاربری خارج شدید");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className={styles.menuWrapper} ref={wrapperRef}>
      <button
        className={styles.userButton}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <img src={"/image/SVG/profile.svg"} alt="profile" />{" "}
        <span>{toPersianNumber(user.mobile)}</span>
        <img src={"/image/SVG/arrowDown.svg"} alt="arrow down" />
      </button>

      {dropdownOpen && (
        <div className={styles.dropdown}>
          <label className={styles.labelNumber}>
            <span className={styles.svgMobile}>
              <img src={"/image/SVG/profileN.svg"} alt="profile" />
            </span>
            <span className={styles.mobile}>{toPersianNumber(user.mobile)}</span>
          </label>

          <button
            className={styles.dropdownItem}
            onClick={() => router.push("/profile")}
          >
            اطلاعات حساب کاربری
            <span>
              <img src={"/image/SVG/profileL.svg"} alt="profile" />
            </span>
          </button>
          <button className={styles.dropdownItem} onClick={handleLogout}>
            خروج از حساب کاربری
            <span>
              <img src={"/image/SVG/logout.svg"} alt="logout" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
