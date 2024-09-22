import { useState, useEffect } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); // Update time every second
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const formatTime = (date: any) => {
    // Format the time like "0:05 PM"
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format the date like "Sep 21, 2024"
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
