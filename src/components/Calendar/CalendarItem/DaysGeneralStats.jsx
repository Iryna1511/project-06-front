import React, { forwardRef, useCallback } from 'react';
import s from './DaysGeneralStats.module.css';

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

const DaysGeneralStats = forwardRef(({ note, index }, ref) => {
  const { date, waterRate, percent, consumptionCount } = note;

  const findColumnKey = (index, positions) => {
    return Object.keys(positions).find(key => positions[key].includes(index));
  };

  const getColumnKey = useCallback(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
      return findColumnKey(index, positionMobile);
    } else if (screenWidth >= 768 && screenWidth <= 1439) {
      return findColumnKey(index, positionTablet);
    }
    return null;
  }, [index]);

  const columnKey = getColumnKey();

  const positionStyle = columnKey => {
    switch (columnKey) {
      case 'firstColumn':
        return { right: '-241px' };
      case 'secondColumn':
        return { right: '-183px' };
      case 'thirdColumn':
        return { right: '-125px' };
      case 'fourthColumn':
        return { right: '-67px' };
      default:
        return {};
    }
  };

  return (
    <ul className={s.stats_list} ref={ref} style={positionStyle(columnKey)}>
      <li className={s.date}>{date}</li>
      <li className={s.stat}>
        Daily norma: <span className={s.accent}>{waterRate}</span>
      </li>
      <li className={s.stat}>
        Fulfillment of the daily norm:{' '}
        <span className={s.accent}>{percent}</span>
      </li>
      <li className={s.stat}>
        How many servings of water:{' '}
        <span className={s.accent}>{consumptionCount}</span>
      </li>
    </ul>
  );
});

export default DaysGeneralStats;
