import { useState, useEffect } from "react";
import { CalendarStyle, LoaderMonthWrapper } from "./MonthStatsTable.styled";
import icons from "../../img/icons.svg";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from "date-fns";
import { getMonthWater } from "../../redux/monthWater/monthWaterThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingMonthWater,
  selectMonthWaterDetails,
} from "../../redux/monthWater/monthWaterselectors";
import Loader from "../../components/Loader/Loader";
import { DaysGeneralStats } from "../Calendar/CalendarItem/DaysGeneralStats.jsx";
import { useTranslation } from "react-i18next";

const MonthStatsTable = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const isLoadingMonth = useSelector(selectIsLoadingMonthWater);
  const monthWater = Object.entries(useSelector(selectMonthWaterDetails)).map(([date, details]) => details);

  const currentMonth = format(currentDate, "MMMM");
  const currentYear = format(currentDate, "yyyy");

  // Форматування дати для відображення
  const formatDateForDispatch = (date) => format(date, "yyyy-MM");
  const d = formatDateForDispatch(currentDate);

  const dispatch = useDispatch();

  // Викликаємо дані про воду при зміні місяця
  useEffect(() => {
    dispatch(getMonthWater(d));
  }, [dispatch, d]);

  const handleChangeMonth = (offset) => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset)
    );
  };

  // Пошук відповідних даних для дати
  const findDayData = (date) => {
    const formattedDate = format(date, "d, MMMM"); // Співставляємо формат з вашим масивом
    return monthWater.find((item) => item.date === formattedDate);
  };

  // Обробка кліку на день календаря
  const handleClick = (date, index) => {
    const dayData = findDayData(date) || { waterConsumptionPercentage: 0, waterConsumptionCount: 0, dateNorm: 0 };

    setSelectedDay({
      ...dayData,
      date: format(date, "yyyy-MM-dd"),
      waterRate: dayData.dateNorm, // Передаємо норму води
      percent: dayData.waterConsumptionPercentage, // Передаємо відсоток виконання норми
      consumptionCount: dayData.waterConsumptionCount, // Передаємо кількість порцій
      index,
    });

    console.log("Selected Day:", {
      ...dayData,
      date: format(date, "yyyy-MM-dd"),
      waterRate: dayData.dateNorm, // Передаємо норму води
      percent: dayData.waterConsumptionPercentage, // Передаємо відсоток виконання норми
      consumptionCount: dayData.waterConsumptionCount, // Передаємо кількість порцій
      index,
    });
  };

  const getMonthBounds = (date) => ({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  const getMonthDays = (date) => {
    const { start, end } = getMonthBounds(date);
    return eachDayOfInterval({ start, end });
  };

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
              <use href={icons + "#icon-arrow-right"}></use>
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
            const formattedDate = format(date, "d, MMMM"); // Співставляємо з вашим форматом дати
            const dayData = findDayData(date) || { waterConsumptionPercentage: 0, waterConsumptionCount: 0, dateNorm: 0 };

            return (
              <li key={formattedDate} className="day">
                <button
                  className={`calendarDayBtn ${isToday(date) ? "today" : ""}`}
                  onClick={() => handleClick(date, index)}
                >
                  {format(date, "d")}
                </button>
                <p className="progressWaterText">
                  {dayData.waterConsumptionPercentage ? `${dayData.waterConsumptionPercentage.toFixed(0)}%` : "0%"}
                </p>
                {selectedDay && selectedDay.date === format(date, "yyyy-MM-dd") && (
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