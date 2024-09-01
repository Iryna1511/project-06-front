import { useEffect, useRef, useState } from 'react';
import { React } from 'react';
import DaysGeneralStats from './DaysGeneralStats';
import s from './CalendarItem.module.css';

const CalendarItem = ({ note, index }) => {
  const [isStatsListVisible, setStatsListVisible] = useState(false);
  const statsList = useRef(null);

  const handleClickOutside = event => {
    if (statsList.current && !statsList.current.contains(event.target)) {
      setStatsListVisible(false);
    }
  };

  const handleEscapePress = event => {
    if (event.key === 'Escape') {
      setStatsListVisible(false);
    }
  };

  useEffect(() => {
    if (isStatsListVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isStatsListVisible]);

  const toggleStatsList = e => {
    if (statsList.current && statsList.current.contains(e.target)) {
      return;
    }
    setStatsListVisible(!isStatsListVisible);
  };

  return (
    <li className={s.calendar_item} onClick={toggleStatsList}>
      <p
        className={`${s.date} ${
          parseInt(note.percent) < 100 ? s.orange_border : ''
        }`}
      >
        {index + 1}
      </p>
      <p className={s.percent}>{note.percent}</p>
      {isStatsListVisible && (
        <DaysGeneralStats note={note} index={index + 1} ref={statsList} />
      )}
    </li>
  );
};

export default CalendarItem;
