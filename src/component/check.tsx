import React from "react";

interface CheckComProps {
  flag: boolean;
}

const CheckCom: React.FC<CheckComProps> = ({ flag }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        {flag === true ? (
          <img src="check.png" className="w-[40px] aspect-square" />
        ) : (
          <img src="uncheck.png" className="w-[40px] aspect-square" />
        )}
      </div>
    </>
  );
};
export default CheckCom;
