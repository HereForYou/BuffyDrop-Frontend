import React from "react";

interface CheckComProps {
  flag: boolean;
}

const CheckCom: React.FC<CheckComProps> = ({ flag }) => {
  return (
    <>
      <div className=" bg-[#2862e0] w-8 h-8 rounded-full flex items-center justify-center">
        {flag === true ? (
          <img src="image/check.png" className="w-6 h-6" />
        ) : (
          <div className=" bg-white w-6 h-6 rounded-full" />
        )}
      </div>
    </>
  );
};
export default CheckCom;
