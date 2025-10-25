import styles from "./SignInButtonM.module.css";

function SignInButtonM({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>

      <img
        src="/image/signInButtonM.svg"
        alt="login"
        className={styles.icon}
      />

  
      <img
        src="/image/svg/HeaderWebSVG/signinbuttom.svg"
        alt="loginButton"
        className={styles.webIcon}
      />
    </button>
  );
}

export default SignInButtonM;
