import { useState, useEffect } from 'react';

function formatDate(date) {
  if (!date) return '';

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date;
      const newDate = formatDate(now);

      setTimeString(newDate);
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    }
  }, [])

  return { timeString };
}

export default useClock;
