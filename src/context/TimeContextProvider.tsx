import React, { useState, createContext, ReactNode, useContext } from "react";

interface ITimeContext {
  minedAmount: number;
  remainTime: number;
  setMinedAmount: React.Dispatch<React.SetStateAction<number>>;
  setRemainTime: React.Dispatch<React.SetStateAction<number>>;
}

interface ITimeContextProvider {
    children: ReactNode;
}

export const TimeContext = createContext<ITimeContext | undefined>(
  undefined
);

export const TimeContextProvider : React.FC<ITimeContextProvider> = ({ children }) => {
  const [remainTime, setRemainTime] = useState(0);
  const [minedAmount, setMinedAmount] = useState(0);
  return (
    <TimeContext.Provider
      value={{
        minedAmount,
        remainTime,
        setMinedAmount,
        setRemainTime,
      }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);

  if (context === undefined) {
    throw new Error(`useTimeContext must be used within a TimeContextprovider`);
  }

  return context;
};
