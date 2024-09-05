import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../../components/Logo/Logo.jsx";
import UserAuth from "../../components/UserAuth/UserAuth.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const { user, isLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log("Header token:", token);
    // console.log("Header user:", user);
  }, [dispatch, token, user?.email]);

  return (
    <header className={styles.header}>
      <Logo
        isUserLoggedIn={isLoggedIn}
        userName={user?.name}
        userPhoto={user?.photoUrl}
      />
      <UserAuth
        isUserLoggedIn={isLoggedIn}
        userName={user?.name}
        userPhoto={user?.photoUrl}
        userEmail={user?.email}
      />
    </header>
  );
}
