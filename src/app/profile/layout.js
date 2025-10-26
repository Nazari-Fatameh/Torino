"use client";

import AuthProvider from "@/Components/partials/provider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../Styles/ProfileLayout.module.css";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div className={styles.container}>
     
        <aside className={styles.sidebox}>
          <MenuLink
            href="/profile"
            icon="/image/svg/profilepanel/profileB.svg"
            activeIcon="/image/svg/profilepanel/profileG.svg"
            label="پروفایل"
            active={pathname === "/profile"}
          />

          <MenuLink
            href="/profile/userTour"
            icon="/image/svg/profilepanel/sun.svg"
            activeIcon="/image/svg/profilepanel/sunG.svg"
            label="تورهای من"
            active={pathname === "/profile/userTour"}
          />

          <MenuLink
            href="/profile/transactions"
            icon="/image/svg/profilepanel/convertCard.svg"
            activeIcon="/image/svg/profilepanel/convertG.svg"
            label="تراکنش‌ها"
            active={pathname === "/profile/transactions"}
          />
        </aside>

       
        <div className={styles.mainArea}>
        
        <nav className={styles.mobileLinks}>
  <ul>
    <li>
      <MenuLink
        href="/profile"
        icon="/image/svg/profilepanel/profileB.svg"
        activeIcon="/image/svg/profilepanel/profileG.svg"
        label="پروفایل"
        active={pathname === "/profile"}
      />
    </li>
    <li>
      <MenuLink
        href="/profile/userTour"
        icon="/image/svg/profilepanel/sun.svg"
        activeIcon="/image/svg/profilepanel/sunG.svg"
        label="تورهای من"
        active={pathname === "/profile/userTour"}
      />
    </li>
    <li>
      <MenuLink
        href="/profile/transactions"
        icon="/image/svg/profilepanel/convertCard.svg"
        activeIcon="/image/svg/profilepanel/convertG.svg"
        label="تراکنش‌ها"
        active={pathname === "/profile/transactions"}
      />
    </li>
  </ul>
</nav>


          
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}


function MenuLink({ href, icon, activeIcon, label, active }) {
  return (
    <Link
      href={href}
      className={
        active ? `${styles.menuItem} ${styles.activeItem}` : styles.menuItem
      }
    >
      <img
        src={active ? activeIcon : icon}
        alt={label}
        className={styles.menuIcon}
      />
      <span>{label}</span>
    </Link>
  );
}
