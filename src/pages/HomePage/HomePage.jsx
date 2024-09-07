import css from "./HomePage.module.css";

import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import { ContentWrapper, HomePageSection } from './HomePage.styled';


export default function HomePage() {
  return (
    <div className={css.pageContainer}>
      <p>тут буде контент для залогіненого користувача</p>
      <HomePageSection>
        <ContentWrapper className="right-panel">
         
          <MonthStatsTable/>
        </ContentWrapper>
      </HomePageSection>
      
    </div>
  );
}
