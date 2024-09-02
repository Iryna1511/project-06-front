import css from "./HomePage.module.css";
import Calendar from '../../components/Calendar/Calendar';
import store from "../../redux/store";
import { Provider } from 'react-redux';


export default function HomePage() {
  return <div className={css.pageContainer}>
  <Provider store={store}>
    <Calendar/>
  </Provider>
  </div>;
  
}
