import React from "react";

interface ExpCardProps {
  earn: string;
  // color: string;
  profit: string;
  flag: boolean;
}

const ExpCard: React.FC<ExpCardProps> = ({ earn, profit, flag }) => {
  return (
    <div className="customCard-container grid grid-col-2 w-1/3  grid-col-1">
      <div className="customCard group w-full py-2 sm:py-4 lg:py-6 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
        <p className="text-sm md:text-lg lg:text-xl">{earn}</p>
        <div className="flex flex-row justify-center align-middle pt-2">
          <p className=" text-2xl">
            {flag ? (
              <img
                src="/image/dollar.png"
                alt=""
                className="w-6 h-6 max-sm:w-4 max-sm:h-4"
              />
            ) : (
              <></>
            )}
          </p>
          <p className=" text-[12px] sm:text-sm md:text-md">
            &nbsp;{profit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpCard;
