import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo/Logo.jsx";
import UserAuth from "../UserAuth/UserAuth.jsx";
import { fetchUserProfile } from "../../redux/auth/operations"; // Приклад операції для завантаження профілю
import styles from "./Header.module.css"

export default function Header() {
  const dispatch = useDispatch();
  
  const { user, isLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user.email) {
      dispatch(fetchUserProfile()); // Якщо токен є, але користувач ще не завантажений
    }
  }, [dispatch, token, user.email]);

  return (
    <header className={styles.header}>
      <Logo isUserLoggedIn={isLoggedIn} userName={user.name} userPhoto={user.photoUrl} />
      <UserAuth isUserLoggedIn={isLoggedIn} userName={user.name} userPhoto={user.photoUrl} userEmail={user.email} />
    </header>
  );
}