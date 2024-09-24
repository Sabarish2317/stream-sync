import { useState, useEffect } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: any) => {
    // 0:05PM
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Sep 21, 2024
    const formattedDate = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${time} • ${formattedDate}`;
  };

  return (
    <div>
      <h4>{formatTime(currentTime)}</h4>
    </div>
  );
};

export default TimeDisplay;
