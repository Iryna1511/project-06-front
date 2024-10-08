import { useState, useEffect, useCallback, useRef } from "react";
import s from "./DaysGeneralStats.module.css";

const positionMobile = {
  firstColumn: [0, 5, 10, 15, 20, 25, 30],
  secondColumn: [1, 6, 11, 16, 21, 26],
  thirdColumn: [2, 7, 12, 17, 22, 27],
  fourthColumn: [3, 8, 13, 18, 23, 28],
};

const positionTablet = {
  firstColumn: [0, 10, 20, 30],
  secondColumn: [1, 11, 21, 31],
  thirdColumn: [2, 12, 22],
  fourthColumn: [3, 13, 23],
  fifthColumn: [4, 14, 24],
  sixthColumn: [5, 15, 25],
  seventhColumn: [6, 16, 26],
  eighthColumn: [7, 17, 27],
  ninthColumn: [8, 18, 28],
  tenthColumn: [9, 19, 29],
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

  // Визначаємо позицію для мобільного екрану
  const positionStyleMobile = (columnKey) => {
    switch (columnKey) {
      case "firstColumn":
        return { right: "-227px" };
      case "secondColumn":
        return { right: "-170px" };
      case "thirdColumn":
        return { right: "-117px" };
      case "fourthColumn":
        return { right: "-62px" };
      default:
        return { right: "-9px" };
    }
  };

  // Визначаємо позицію для планшета
  const positionStyleTablet = (columnKey) => {
    switch (columnKey) {
      case "firstColumn":
        return { right: "-220px" };
      case "secondColumn":
        return { right: "-220px" };
      case "thirdColumn":
        return { right: "-220px" };
      case "fourthColumn":
        return { right: "-220px" };
      case "fifthColumn":
        return { right: "-220px" };
      case "sixthColumn":
        return { right: "-220px" };
      case "seventhColumn":
        return { right: "-220px" };
      case "eighthColumn":
        return { right: "0px" };
      case "ninthColumn":
        return { right: "0px" };
      default:
        return { right: "0px" };
    }
  };

  // Визначаємо яку позицію вибрати в залежності від розміру екрану
  const positionStyle = () => {
    if (screenWidth <= 767) {
      return positionStyleMobile(columnKey);
    } else if (screenWidth >= 768 && screenWidth <= 1439) {
      return positionStyleTablet(columnKey);
    } else {
      return { right: "0px" }; // Для великих екранів
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-US", { month: "short" }); 
    return `${day}, ${month}`;
  };

  return (
    <ul
      ref={modalRef}
      className={s.stats_list}
      style={positionStyle()} // Використовуємо відповідні стилі
    >
      <li className={s.date}>{formatDate(date)}</li>
      <li className={s.stat}>
        Daily norma: <span className={s.accent}>{waterRate}</span>
      </li>
      <li className={s.stat}>
        Fulfillment of the daily norm:{" "}
        <span className={s.accent}>{percent}%</span>
      </li>
      <li className={s.stat}>
        How many servings of water:{" "}
        <span className={s.accent}>{consumptionCount}</span>
      </li>
    </ul>
  );
};