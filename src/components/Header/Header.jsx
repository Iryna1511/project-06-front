import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo.jsx";
import UserAuth from "../UserAuth/UserAuth.jsx";


export default function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (userData) => {
    setIsUserLoggedIn(true);
    setUserName(userData.name);
    setUserPhoto(userData.photoUrl);
    setUserEmail(userData.userEmail);
  };

  useEffect(() => {
    const testUserData = {
      name: "John Cena",
      photoUrl:
        "data:image/webp;base64,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",
      userEmail: "JhonCena@ukr.net",
    };
    handleLogin(testUserData); 
  }, []);

  return (
    <header className={styles.header}>
      <Logo
        isUserLoggedIn={isUserLoggedIn}
        userName={userName}
        userPhoto={userPhoto}
      />
      <UserAuth
        isUserLoggedIn={isUserLoggedIn}
        userName={userName}
        userPhoto={userPhoto}
        userEmail={userEmail}
      />
    </header>
  );
}
