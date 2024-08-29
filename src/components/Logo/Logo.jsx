import styles from "./Logo.module.css";
import logo from "../../../public/logo.svg";


export default function Logo() {

  return (
    <>
      <a href="/" className={styles.logoLink}>
        <img src={logo} alt="LogoOfTheHeader" />
        <div className={styles.textOfLogo}>
          Tracker <br />
          of water
        </div>
      </a>
    </>
  );
}
