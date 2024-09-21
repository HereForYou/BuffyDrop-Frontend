import React, { useState } from "react";
import { useTimeContext } from "../context/TimeContextProvider";
import { ENDPOINT } from "../data";
import axios from "axios";

interface ITap {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Tap: React.FC<ITap> = React.memo(({ setPoints }) => {
  const [counts, setCounts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const { userId, setTotalPoints } = useTimeContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (energy - energyToReduce < 0) {
    //   return;
    // }
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(rect, " ", e.clientX, " ", e.clientY);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setCounts([...counts, { id: Date.now(), x, y }]);

    axios
      .post(`${ENDPOINT}/api/user/tap/${userId}`, { point: 1 })
      .then((res) => {
        console.log("this is tap", res.data);
        setPoints(res.data.totalPoints);
        setTotalPoints(res.data.user.totalPoints);
      })
      .catch((err) => {
        console.log("In tap request be some errors", err);
      });
  };

  const handleAnimationEnd = (id: number) => {
    setCounts((prevcounts) => prevcounts.filter((click) => click.id !== id));
  };

  return (
    <div className='flex justify-center'>
      <div className='relative flex justify-center w-1/3' onClick={handleClick}>
        <img
          src='/coat.png'
          className='w-full select-none pointer-events-none'
          draggable={false}
          alt='A cute dog avatar'
        />
        {counts.map((count) => (
          <div
            key={count.id}
            className='absolute text-2xl text-[#4b37dd] font-bold opacity-0 select-none pointer-events-none'
            style={{
              top: `${count.y}px`,
              left: `${count.x}px`,
              animation: `float 1s ease-out`,
            }}
            onAnimationEnd={() => handleAnimationEnd(count.id)}>
            1
          </div>
        ))}
      </div>
    </div>
  );
});

export default Tap;
