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
