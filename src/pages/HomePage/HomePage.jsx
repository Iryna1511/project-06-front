import css from "./HomePage.module.css";

import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

export default function HomePage() {
  return (
    <div className={css.pageContainer}>
      <p>тут буде контент для залогіненого користувача</p>
      <MonthStatsTable/>
    </div>
  );
}
