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
