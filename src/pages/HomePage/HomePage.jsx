import css from "./HomePage.module.css";
import Calendar from '../../components/Calendar/Calendar';


export default function HomePage() {
  return <div className={css.pageContainer}>
    <Calendar />
  </div>;
 
}
