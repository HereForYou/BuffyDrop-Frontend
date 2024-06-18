import React, { useEffect, useState } from "react";

const TimeText: React.FC = () => {
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setHour(hours);
      setMin(minutes);
      setSecond(seconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <p className="text-right text-gray-500 w-full">
      {hour < 10 ? "0" + hour : hour}:{min < 10 ? "0" + min : min}:
      {second < 10 ? "0" + second : second}
    </p>
  );
};

export default TimeText;
