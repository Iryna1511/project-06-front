import { addHours, format, parseISO } from 'date-fns';

export function formatDate(dateString, formatString = 'yyyy-MM-dd ') {
  const date = new Date(dateString);
  return format(date, formatString);
}

export function formatTime(dateString, formatString = 'h:mm a') {
  const date = addHours(parseISO(dateString), -2);
  return format(date, formatString);
}

export function newDate(date) {
  const currentDate = date;
  const times = format(new Date(), 'HH:mm');
  let isoDate;
  const [hours, minutes] = times.split(':');
  currentDate.setHours(hours, minutes);
  isoDate = currentDate.toISOString().slice(0, 16);
  const currentDate2 = new Date(isoDate);
  const newDate = new Date(currentDate2);
  newDate.setHours(currentDate2.getHours() + 2);

  const formattedNewDate =
    newDate.getFullYear() +
    '-' +
    ('0' + (newDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + newDate.getDate()).slice(-2) +
    'T' +
    ('0' + newDate.getHours()).slice(-2) +
    ':' +
    ('0' + newDate.getMinutes()).slice(-2);
  isoDate = formattedNewDate;
  return isoDate;
}
