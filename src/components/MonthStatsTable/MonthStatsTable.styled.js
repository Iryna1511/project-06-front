import styled from "styled-components";

export const CalendarStyle = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
  }

  .sectionText {
    color: #2f2f2f;
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
  }

  .month {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(
      7,
      1fr
    ); /* Встановлено 1fr для рівномірного розподілу */
    gap: 10px;
  }

  .monthNav {
    display: flex;
    align-items: center;
  }

  .navBtn {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
  }

  .dateText {
    color: #407bff;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .step {
    width: 26px;
  }

  .calendarDayBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    transition: background-color 0.3s;
    border-color: #ff9d43;
  }

  .calendarDayBtn:hover {
    box-shadow: 0 2px 4px 0 rgba(64, 123, 255, 0.3);
  }

  .border-orange {
    border: 1px solid #ffa500; /* Помаранчевий бордер для днів з невиконаною нормою */
  }

  .today {
    background-color: #ffffff; /* Блакитний */
  }

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* Додати позиціонування */
  }

  .progressWaterText {
    color: #00bfff; /* Блакитний */
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }

  @media screen and (min-width: 768px) {
    .month {
      grid-template-columns: repeat(7, 1fr);
    }
  }

  .activeStats {
    display: block;
  }
`;

export const LoaderMonthWrapper = styled.div`
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
