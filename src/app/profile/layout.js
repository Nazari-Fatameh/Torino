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
        {/* سایدبار */}
        <aside className={styles.sidebox}>
          <MenuLink
            href="/profile"
            icon="/image/svg/profilepanel/profileLa.svg"
            activeIcon="/image/svg/profilepanel/profileLaActive.svg"
            label="پروفایل"
            active={pathname === "/profile"}
          />

          <MenuLink
            href="/profile/userTour"
            icon="/image/svg/profilepanel/sun.svg"
            activeIcon="/image/svg/profilepanel/sunActive.svg"
            label="تورهای من"
            active={pathname === "/profile/userTour"}
          />

          <MenuLink
            href="/profile/transactions"
            icon="/image/svg/profilepanel/convertCard.svg"
            activeIcon="/image/svg/profilepanel/convertCardActive.svg"
            label="تراکنش‌ها"
            active={pathname === "/profile/transactions"}
          />
        </aside>

        {/* بخش اصلی */}
        <div className={styles.mainArea}>
          {/* منوی موبایل */}
          <nav className={styles.mobileLinks}>
            <ul>
              <li className={pathname === "/profile" ? styles.activeLink : ""}>
                <Link href="/profile">
                  <img
                    src={
                      pathname === "/profile"
                        ? "/image/svg/profilepanel/profileG.svg"
                        : "/image/svg/profileB.svg"
                    }
                    alt="profile"
                  />
                  <span>پروفایل</span>
                </Link>
              </li>

              <li
                className={
                  pathname === "/profile/userTour" ? styles.activeLink : ""
                }
              >
                <Link href="/profile/userTour">
                  <img
                    src={
                      pathname === "/profile/userTour"
                        ? "/image/svg/profilepanel/sunG.svg"
                        : "/image/svg/profilepanel/sun.svg"
                    }
                    alt="tours"
                  />
                  <span>تورهای من</span>
                </Link>
              </li>

              <li
                className={
                  pathname === "/profile/transactions" ? styles.activeLink : ""
                }
              >
                <Link href="/profile/transactions">
                  <img
                    src={
                      pathname === "/profile/transactions"
                        ? "/image/svg/profilepanel/convertG.svg"
                        : "/image/svg/profilepanel/convertCard.svg"
                    }
                    alt="transactions"
                  />
                  <span>تراکنش‌ها</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* محتوای صفحه */}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}

/* لینک‌های منو */
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
