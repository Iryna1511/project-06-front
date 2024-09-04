import { useEffect, useState } from 'react';
import css from './TimeDropdown.module.css'

const TimeDropdown = () => {
    const [times, setTimes] = useState([]);
    const [currentTime, setCurrentTime] = useState('');

    // Function to round the current time to the nearest 5 minutes
    const getRoundedCurrentTime = () => {
        const now = new Date();
        const minutes = Math.round(now.getMinutes() / 5) * 5;
        now.setMinutes(minutes);
        now.setSeconds(0, 0);
        const hourStr = now.getHours().toString().padStart(2, '0');
        const minuteStr = now.getMinutes().toString().padStart(2, '0');
        return `${hourStr}:${minuteStr}`;
    };

    // Function to generate time options
    const generateTimes = () => {
        const timeOptions = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 5) {
                const hourStr = hour.toString().padStart(2, '0'); // 2-digit hour format
                const minuteStr = minute.toString().padStart(2, '0'); // 2-digit minute format
                timeOptions.push(`${hourStr}:${minuteStr}`);
            }
        }
        setTimes(timeOptions);
    };

    // Use useEffect to generate times and set the current time on component mount
    useEffect(() => {
        generateTimes();
        setCurrentTime(getRoundedCurrentTime());
    }, []);

    return (
        <select className={css.timeNow} id="timePicker" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)}>
                {times.map((time, index) => (
                    <option key={index} value={time}>
                        {time}
                    </option>
                ))}
        </select>        
    );
};

export default TimeDropdown;