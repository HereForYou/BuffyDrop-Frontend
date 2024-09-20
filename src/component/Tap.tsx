import React, { useState } from "react";

interface ITap {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Tap: React.FC<ITap> = ({ points, setPoints }) => {
  const [counts, setCounts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (energy - energyToReduce < 0) {
    //   return;
    // }
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(rect," ",e.clientX," ",e.clientY);
    console.log(window.innerWidth)
    
    const x = e.clientX - window.innerWidth/2 + rect.x -rect.width;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    // setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setCounts([...counts, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setCounts((prevcounts) => prevcounts.filter((click) => click.id !== id));
  };

  console.log("This is Buffy Dog!!!")

  return (
    <div className='w-full flex justify-center relative'>
      <img
        src='/coat.png'
        className='w-1/3'
        alt='A cute dog avatar'
        onClick={handleClick}
      />
      {counts.map((count) => (
        <div
          key={count.id}
          className='absolute text-2xl text-red-500 font-bold opacity-0'
          style={{
            top: `${count.y - 42}px`,
            left: `${count.x}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(count.id)}>
          1
        </div>
      ))}
    </div>
  );
};

export default Tap;
