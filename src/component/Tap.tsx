import React, { useState } from "react";

interface ITap {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

const Tap: React.FC<ITap> = React.memo(({ points, setPoints }) => {
  const [counts, setCounts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 1;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (energy - energyToReduce < 0) {
    //   return;
    // }
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(rect, " ", e.clientX, " ", e.clientY);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    // setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setCounts([...counts, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setCounts((prevcounts) => prevcounts.filter((click) => click.id !== id));
  };

  console.log("This is Buffy Dog!!!");

  return (
    <div className='flex justify-center pointer-events-none'>
      <div className="relative flex justify-center w-1/3" onClick={handleClick}>
        <img
          src='/coat.png'
          className='w-full select-none pointer-events-none'
          draggable={false}
          alt='A cute dog avatar'
        />
        {counts.map((count) => (
          <div
            key={count.id}
            className='absolute text-2xl text-red-500 font-bold opacity-0 select-none pointer-events-none'
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
