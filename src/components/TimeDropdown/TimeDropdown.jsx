// import { useState } from 'react';
// import css from './TimeDropdown.module.css'

export const TimeDropDown = () => {
    const options = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        options.push(<option key={timeString} value={timeString}>{timeString}</option>);
      }
    }
    return options;
  };

//старий функціонал

// const TimeDropdown = () => {
//     const [times, setTimes] = useState([]);
//     const [currentTime, setCurrentTime] = useState('');

//     const getRoundedCurrentTime = () => {
//         const now = new Date();
//         const minutes = Math.round(now.getMinutes() / 5) * 5;
//         now.setMinutes(minutes);
//         now.setSeconds(0, 0);
//         const hourStr = now.getHours().toString().padStart(2, '0');
//         const minuteStr = now.getMinutes().toString().padStart(2, '0');
//         return `${hourStr}:${minuteStr}`;
//     };

//     const generateTimes = () => {
//         const timeOptions = [];
//         for (let hour = 0; hour < 24; hour++) {
//             for (let minute = 0; minute < 60; minute += 5) {
//                 const hourStr = hour.toString().padStart(2, '0');
//                 const minuteStr = minute.toString().padStart(2, '0');
//                 timeOptions.push(`${hourStr}:${minuteStr}`);
//             }
//         }
//         setTimes(timeOptions);
//     };

//     useEffect(() => {
//         generateTimes();
//         setCurrentTime(getRoundedCurrentTime());
//     }, []);

//     return (
//         <select className={css.timeNow} id="timePicker" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)}>
//                 {times.map((time, index) => (
//                     <option key={index} value={time}>
//                         {time}
//                     </option>
//                 ))}
//         </select>        
//     );
// };

// export default TimeDropdown;