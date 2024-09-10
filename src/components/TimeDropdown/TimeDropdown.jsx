export const getCurrentTime = () => {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const roundToNearestFiveMinutes = (time) => {
  let [hours, minutes] = time.split(":").map(Number);

  minutes = Math.round(minutes / 5) * 5;
  if (minutes === 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }

  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

const TimeDropdown = () => {
  const options = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 5) {
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      options.push(
        <option key={timeString} value={timeString}>
          {timeString}
        </option>
      );
    }
  }
  return options;
};

export default TimeDropdown;
