import React from "react";

interface CheckComProps {
  flag: boolean;
}

const CheckCom: React.FC<CheckComProps> = ({ flag }) => {
  return (
    <>
      <div className='flex items-center justify-center'>
        <img
          src={`${flag ? "check.png" : "uncheck.png"}"check.png"`}
          className='w-10 aspect-square'
          loading='lazy'
          alt='check'
        />
      </div>
    </>
  );
};
export default CheckCom;
