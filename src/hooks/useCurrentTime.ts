import { useState, useEffect } from 'react';
import { formatCurrentTime } from '../utils/formatters';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 60000); // Actualiza cada minuto

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};