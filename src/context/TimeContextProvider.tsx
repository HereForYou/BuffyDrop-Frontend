import React, { useState, createContext, ReactNode, useContext } from "react";

interface ITimeContext {
  minedAmount: number;
  notReceiveAmount: number;
  remainTime: number;
  setMinedAmount: React.Dispatch<React.SetStateAction<number>>;
  setNotReceivedAmount: React.Dispatch<React.SetStateAction<number>>;
  setRemainTime: React.Dispatch<React.SetStateAction<number>>;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  totalTime: number;
  userId: string;
}

interface ITimeContextProvider {
  children: ReactNode;
}

export const TimeContext = createContext<ITimeContext | undefined>(undefined);

export const TimeContextProvider: React.FC<ITimeContextProvider> = ({
  children,
}) => {
  const [userId, setUserId] = useState("");
  const [totalTime, setTotalTime] = useState(100000000);
  const [remainTime, setRemainTime] = useState(1);
  const [minedAmount, setMinedAmount] = useState(0);
  const [notReceiveAmount, setNotReceivedAmount] = useState(0);
  return (
    <TimeContext.Provider
      value={{
        minedAmount,
        notReceiveAmount,
        remainTime,
        setMinedAmount,
        setNotReceivedAmount,
        setRemainTime,
        setTotalTime,
        setUserId,
        totalTime,
        userId,
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
