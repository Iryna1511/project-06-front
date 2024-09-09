import { useState, useEffect, useCallback, useRef } from "react";
import s from "./DaysGeneralStats.module.css";

const positionMobile = {
  firstColumn: [1, 6, 11, 16, 21, 26, 31],
  secondColumn: [2, 7, 12, 17, 22, 27],
  thirdColumn: [3, 8, 13, 18, 23, 28],
  fourthColumn: [4, 9, 14, 19, 24, 29],
};

const positionTablet = {
  firstColumn: [1, 11, 21, 31],
  secondColumn: [2, 12, 22],
  thirdColumn: [3, 13, 23],
  fourthColumn: [4, 14, 24],
};

export const DaysGeneralStats = ({ note, index, onClose }) => {
  const { date, waterRate, percent, consumptionCount } = note;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Закриваємо модальне вікно, якщо клік поза ним
      }
    };

    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        onClose(); // Закриваємо модальне вікно при натисканні Esc
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside); // Відстежуємо кліки поза модальним вікном
    window.addEventListener("keydown", handleEscPress); // Відстежуємо натискання Esc

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscPress);
    };
  }, [onClose]);

  const findColumnKey = (index, positions) => {
    return Object.keys(positions).find((key) => positions[key].includes(index));
  };

  const getColumnKey = useCallback(() => {
    if (screenWidth <= 767) {
      return findColumnKey(index, positionMobile);
    } else if (screenWidth >= 768 && screenWidth <= 1439) {
      return findColumnKey(index, positionTablet);
    } else {
      return "firstColumn"; // Для великих екранів
    }
  }, [index, screenWidth]);

  const columnKey = getColumnKey();

  const positionStyle = (columnKey) => {
    switch (columnKey) {
      case "firstColumn":
        return { right: "-241px" };
      case "secondColumn":
        return { right: "-183px" };
      case "thirdColumn":
        return { right: "-125px" };
      case "fourthColumn":
        return { right: "-67px" };
      default:
        return {};
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" }); // Скорочений формат місяця англійською
    return `${day}, ${month}`;
  };

  return (
    <ul
      ref={modalRef}
      className={s.stats_list}
      style={positionStyle(columnKey)}
    >
      <li className={s.date}>{formatDate(date)}</li>
      <li className={s.stat}>
        Daily norma: <span className={s.accent}>{waterRate}</span>
      </li>
      <li className={s.stat}>
        Fulfillment of the daily norm:{" "}
        <span className={s.accent}>{percent}</span>
      </li>
      <li className={s.stat}>
        How many servings of water:{" "}
        <span className={s.accent}>{consumptionCount}</span>
      </li>
    </ul>
  );
};
