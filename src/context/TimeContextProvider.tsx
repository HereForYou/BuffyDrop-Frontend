import React, { useState, createContext, ReactNode, useContext } from "react";

interface ITimeContext {
  claimed: boolean;
  increasingAmout: number;
  isTimingStarted: boolean;
  minedAmount: number;
  // notReceiveAmount: number;
  remainTime: number;
  totalPoints: number;
  rank: number;
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>;
  setIncreasingAmount: React.Dispatch<React.SetStateAction<number>>;
  setMinedAmount: React.Dispatch<React.SetStateAction<number>>;
  // setNotReceivedAmount: React.Dispatch<React.SetStateAction<number>>;
  setRemainTime: React.Dispatch<React.SetStateAction<number>>;
  setTotalTime: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setIsTimingStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setRank: React.Dispatch<React.SetStateAction<number>>;
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
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
  const [isTimingStarted, setIsTimingStarted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [remainTime, setRemainTime] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [minedAmount, setMinedAmount] = useState(0);
  // const [notReceiveAmount, setNotReceivedAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [increasingAmout, setIncreasingAmount] = useState(0.3);
  const [rank, setRank] = useState(0);
  return (
    <TimeContext.Provider
      value={{
        claimed,
        increasingAmout,
        isTimingStarted,
        minedAmount,
        // notReceiveAmount,
        rank,
        remainTime,
        setIsTimingStarted,
        totalPoints,
        setClaimed,
        setIncreasingAmount,
        setMinedAmount,
        // setNotReceivedAmount,
        setRank,
        setRemainTime,
        setTotalPoints,
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
