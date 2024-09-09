import { useState, useEffect } from "react";
import { CalendarStyle, LoaderMonthWrapper } from "./MonthStatsTable.styled";
import icons from "../../img/icons.svg";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { getMonthWater } from "../../redux/monthWater/monthWaterThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingMonthWater,
  selectMonthWaterDetails,
} from "../../redux/monthWater/monthWaterselectors";
import { formatDate } from "../../redux/mainWater/helpers";
import Loader from "../../components/Loader/Loader";
import {
  // selectNorma,
//  selectTodayWater,
} from "../../redux/waterDetails/waterSelectors";
import { isToday } from "date-fns";
import { DaysGeneralStats } from "../Calendar/CalendarItem/DaysGeneralStats.jsx";
import { useTranslation } from "react-i18next";

const MonthStatsTable = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null); // Додаємо стан для вибраного дня

  const isLoadingMonth = useSelector(selectIsLoadingMonthWater);
  const monthWater = useSelector(selectMonthWaterDetails) || [];
  //const dailyNorm = useSelector(selectNorma) || 0;

  const currentMonth = format(currentDate, "MMMM");
  const currentYear = format(currentDate, "yyyy");

  const d = formatDate(currentDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthWater(d));
  }, [dispatch, d]);

  const handleChangeMonth = (offset) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + offset)
    );
  };

  const handleClick = (date, index) => {
    const dayData = monthWater.find(
      (item) =>
        getFormattedDateWithTime(new Date(item._id)) ===
        getFormattedDateWithTime(date)
    ) || { percent: 0, waterRate: 0, consumptionCount: 0 };

    // Установка вибраного дня
    setSelectedDay({
      ...dayData,
      date: format(date, "yyyy-MM-dd"),
      index,
    });

    console.log("Selected Day:", {
      ...dayData,
      date: format(date, "yyyy-MM-dd"),
      index,
    });
  };

  const getMonthBounds = (date) => {
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  };

  const getMonthDays = (date) => {
    const { start, end } = getMonthBounds(date);
    return eachDayOfInterval({ start, end });
  };

  const getFormattedDateWithTime = (date) =>
    formatDate(new Date(date.setHours(0, 0, 0, 0)));

  return (
    <CalendarStyle>
      <div className="header">
        <span className="sectionText">{t("Month")}</span>
        <div className="monthNav">
          <button className="navBtn" onClick={() => handleChangeMonth(-1)}>
            <svg width="14" height="14">
              <use href={icons + "#icon-arrow-left"}></use>
            </svg>
          </button>
          <h2 className="dateText">
            {t(`monthNames.${currentMonth}`, { defaultValue: currentMonth })},
            {currentYear}
          </h2>
          <button className="navBtn" onClick={() => handleChangeMonth(1)}>
            <svg width="14" height="14">
              <use href={icons + "#icon-arrow-right"}></use>{" "}
            </svg>
          </button>
        </div>
      </div>

      {isLoadingMonth ? (
        <LoaderMonthWrapper>
          <Loader />
        </LoaderMonthWrapper>
      ) : (
        <ul className="month">
          {getMonthDays(currentDate).map((date, index) => {
            const dayData = monthWater.find(
              (item) =>
                getFormattedDateWithTime(new Date(item._id)) ===
                getFormattedDateWithTime(date)
            ) || { percent: 0, waterRate: 0, consumptionCount: 0 };

            return (
              <li key={format(date, "yyyy-MM-dd")} className="day">
                <button
                  className={`calendarDayBtn ${isToday(date) ? "today" : ""}`}
                  onClick={() => handleClick(date, index)}
                >
                  {format(date, "d")}
                </button>
                <p className="progressWaterText">
                  {dayData.percent.toFixed(0)}%
                </p>
                {/* Відображення компоненту DaysGeneralStats при виборі дня */}
                {selectedDay &&
                  selectedDay.date === format(date, "yyyy-MM-dd") && (
                    <DaysGeneralStats
                      note={selectedDay}
                      index={index}
                      onClose={() => setSelectedDay(null)}
                    />
                  )}
              </li>
            );
          })}
        </ul>
      )}
    </CalendarStyle>
  );
};

export default MonthStatsTable;
