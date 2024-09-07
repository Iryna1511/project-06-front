
import Logo from "../../components/Logo/Logo.jsx";
import UserAuth from "../../components/UserAuth/UserAuth.jsx";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <header className={styles.header}>
      <Logo />
      <UserAuth />
    </header>
  );
}
