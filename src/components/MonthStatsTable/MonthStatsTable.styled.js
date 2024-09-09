import styled from 'styled-components';

export const CalendarStyle = styled.div`

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
  }

  .sectionText {
    color: #407BFF;
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
  }

  .month {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(7, 1fr); /* Встановлено 1fr для рівномірного розподілу */
    gap: 10px;
  }

  .monthNav {
    display: flex;
    align-items: center;
  }

  .navBtn {
    display: flex;
    border: 1px solid transparent;
    background-color: transparent;
    border-radius: 50%;
    justify-content: center;
    transition: background-color 0.3s, border 0.3s;
  }

  .navBtn:hover {
    background-color: #ffffff; /* Замінив на формат кольору #FFFFFF */
    border: 1px solid #FFA500; /* Замінив на помаранчевий формат кольору #FFA500 */
  }

  .dateText {
    color: #407BFF;
    width: 130px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .calendarDayBtn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background-color: #ffffff; /* Замінив на формат кольору #FFFFFF */
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    transition: background-color 0.3s;
  }

  .calendarDayBtn:hover {
    background-color: #00BFFF; /* Замінив на блакитний колір */
  }

  .today {
    background-color: #00BFFF; /* Блакитний */
  }

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative; /* Додати позиціонування */
  }

  .progressWaterText {
    color: #00BFFF; /* Блакитний */
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }

  .border {
    border: 1px solid #FFA500; /* Помаранчевий */
  }

  .border-green {
    border: 1px solid #008000; /* Зелений */
  }

  @media screen and (min-width: 768px) {
    .month {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(4, 1fr); /* Виправлено */
    }
    .sectionText {
      font-size: 26px;
      line-height: 32px;
    }
  }
`;

export const ContentPopover = styled.div`
  position: relative;
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  .closeBtnPopover {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
  }

  .datePopover {
    color: #407BFF; /* Блакитний */
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .datePopoverText {
    color: #000000; /* Чорний */
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .popoverColorText {
    color: #407BFF; /* Блакитний */
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }

  @media screen and (min-width: 768px) {
    padding: 24px 16px;
  }
`;

export const ContentPopoverErr = styled.div`
  position: relative;
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  .closeBtnPopover {
    position: absolute;
    top: 13px;
    right: 13px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
  }

  .datePopover {
    color: #407BFF; /* Блакитний */
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .errText {
    color: #000000; /* Чорний */
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 30px 24px;
  }
`;

export const LoaderMonthWrapper = styled.div`
  position: relative;
  height: 437px;

  @media screen and (min-width: 768px) {
    height: 262px;
  }
`;