import { useState, useEffect } from "react";
import { CalendarStyle, LoaderMonthWrapper } from "./MonthStatsTable.styled";
import icons from "../../img/icons.svg";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import { getMonthWater } from "../../redux/monthWater/monthWaterThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoadingMonthWater,
  selectMonthWaterDetails,
} from "../../redux/monthWater/monthWaterselectors";
import Loader from "../../components/Loader/Loader";
import { DaysGeneralStats } from "../Calendar/CalendarItem/DaysGeneralStats.jsx";
import { useTranslation } from "react-i18next";
import { selectUser, selectWaterRate } from "../../redux/auth/selectors.js";
import {
  selectWaterToday,
  selectWaterConsumptionPercentage,
} from "../../redux/mainWater/selectors.js";

const MonthStatsTable = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const waterRate = useSelector(selectWaterRate);

  const isLoadingMonth = useSelector(selectIsLoadingMonthWater);
  const monthWater = Object.entries(useSelector(selectMonthWaterDetails)).map(
    ([date, details]) => details
  );

  const currentMonth = format(currentDate, "MMMM");
  const currentYear = format(currentDate, "yyyy");

  // Сьогоднішні данні по нормі води, процентах відношення випитої до норми, кількість прийомів

  const user = useSelector(selectUser);
  const dayNormaWater = user.waterRate / 1000;
  const amountOfDrunkWater = useSelector(selectWaterToday);
  const numberOfWaterIntakes = amountOfDrunkWater.length;
  const prercentOfDailyNorma = useSelector(selectWaterConsumptionPercentage);

  // Форматування дати для відображення
  const formatDateForDispatch = (date) => format(date, "yyyy-MM");
  const d = formatDateForDispatch(currentDate);

  const dispatch = useDispatch();

  // Викликаємо дані про воду при зміні місяця
  useEffect(() => {
    dispatch(getMonthWater(d));
  }, [dispatch, d, waterRate]);

  const handleChangeMonth = (offset) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + offset)
    );
  };

  // Пошук відповідних даних для дати
  const findDayData = (date) => {
    const formattedDate = format(date, "d, MMMM"); // Співставляємо формат з вашим масивом
    return monthWater.find((item) => item.date === formattedDate);
  };

  // Обробка кліку на день календаря
  const handleClick = (date, index) => {
    let dayData;

    if (isToday(date)) {
      // Якщо день є сьогоднішнім, використовуємо дані з редаксу
      dayData = {
        waterConsumptionPercentage: prercentOfDailyNorma,
        waterConsumptionCount: numberOfWaterIntakes,
        dateNorm: dayNormaWater,
      };
    } else {
      // Для інших днів використовуємо дані з бекенду
      dayData = findDayData(date) || {
        waterConsumptionPercentage: 0,
        waterConsumptionCount: 0,
        dateNorm: 0,
      };
    }

    setSelectedDay({
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

  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

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
            {t(`monthNames.${currentMonth}`, { defaultValue: currentMonth })},{" "}
            {currentYear}
          </h2>
          {!isCurrentMonth ? (
            <button className="navBtn" onClick={() => handleChangeMonth(1)}>
              <svg width="14" height="14">
                <use href={icons + "#icon-arrow-right"}></use>
              </svg>
            </button>
          ) : (
            <div className="step"></div>
          )}
        </div>
      </div>

      {isLoadingMonth ? (
        <LoaderMonthWrapper>
          <Loader />
        </LoaderMonthWrapper>
      ) : (
        <ul className="month">
          {getMonthDays(currentDate).map((date, index) => {
            let dayData;

            if (isToday(date)) {
              // Якщо день є сьогоднішнім, використовуємо дані з редаксу
              dayData = {
                waterConsumptionPercentage: prercentOfDailyNorma,
                waterConsumptionCount: numberOfWaterIntakes,
                dateNorm: dayNormaWater,
              };
            } else {
              // Для інших днів використовуємо дані з бекенду
              dayData = findDayData(date) || {
                waterConsumptionPercentage: 0,
                waterConsumptionCount: 0,
                dateNorm: 0,
              };
            }

            // Додаємо умову для помаранчевого бордера, якщо норма води не виконана
            const buttonClass =
              dayData.waterConsumptionPercentage < 100
                ? "calendarDayBtn border-orange"
                : "calendarDayBtn";

            return (
              <li key={format(date, "d, MMMM")} className="day">
                <button
                  className={`${buttonClass} ${isToday(date) ? "today" : ""}`}
                  onClick={() => handleClick(date, index)}
                >
                  {format(date, "d")}
                </button>
                <p className="progressWaterText">
                  {dayData.waterConsumptionPercentage
                    ? `${dayData.waterConsumptionPercentage.toFixed(0)}%`
                    : "0%"}
                </p>
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
