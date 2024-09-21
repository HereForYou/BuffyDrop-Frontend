import { useMemo } from "react";
import axios from "axios";
import { AnimatedCounter } from "react-animated-counter";
import {
  getHours,
  getMinutes,
  formatMiningNumber,
  getSeconds,
} from "../utils/functions";
import { useTimeContext } from "../context/TimeContextProvider";
import { ENDPOINT } from "../data";

const TimeCount = () => {
  const {
    isTimingStarted,
    remainTime,
    setRemainTime,
    minedAmount,
    totalTime,
    setTotalTime,
    notReceiveAmount,
    userId,
    setIsTimingStarted,
    setMinedAmount,
    setNotReceivedAmount,
    setTotalPoints,
  } = useTimeContext();

  const miningHour = useMemo(() => {
    return getHours(totalTime - remainTime);
  }, [remainTime]);

  const miningMinute = useMemo(() => {
    return getMinutes(totalTime - remainTime);
  }, [remainTime]);
  const miningSecond = useMemo(() => {
    return getSeconds(totalTime - remainTime);
  }, [remainTime]);

  const claimFarming = () => {
    console.log("claim Farming click");
    axios
      .get(`${ENDPOINT}/api/user/updatepoints/${userId}`)
      .then((res) => {
        console.log("Receive Amount Response > ", res.data);
        setTotalTime(res.data.countDown);
        setRemainTime(1);
        setNotReceivedAmount(0);
        setTotalPoints((prev) => prev + minedAmount);
        setMinedAmount(0);
      })
      .catch((err) => console.log("Receive Amount Error > ", err));
  };

  const startFarming = async () => {
    await axios
      .post(`${ENDPOINT}/api/user/start/${userId}`)
      .then((res) => {
        console.log("Start Farming Response > ", res);
        setIsTimingStarted(true);
        setTotalTime(res.data.cycleTime);
      })
      .catch((err) => console.log("Start Farming Error > ", err));
  };
  console.log("TotalTime", totalTime);

  return totalTime > 0 ? (
    isTimingStarted ? (
      <div className='w-full bg-gray-500 text-gray-400 px-4 py-1 rounded-lg h-14 transition-all duration-200'>
        <div className='flex justify-center items-center relative h-full'>
          <div className='flex h-full justify-center gap-2 items-center font-bold text-xl'>
            <p>Farming</p>
            <AnimatedCounter
              value={Math.floor(Number(minedAmount))}
              //   value={Number(formatMiningNumber(minedAmount))}
              color='text-gray-400'
              incrementColor='text-gray-400'
              decrementColor='text-gray-400'
            />
          </div>
          <div className='flex gap-2 absolute right-0 top-0 justify-center text-sm items-center h-full'>
            <div className='flex'>
              <p>{miningHour}</p>
              <p>h</p>
            </div>
            <div className='flex'>
              <p>{miningMinute}</p>
              <p>m</p>
            </div>
            <div className='flex'>
              <p>{miningSecond}</p>
              <p className='uppercase'>s</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <button
        className='flex justify-center items-center h-14 w-full bg-white text-black rounded-lg font-bold transition-all duration-200 hover:translate-y-[2px]'
        onClick={() => startFarming()}>
        Start farming
      </button>
    )
  ) : (
    <button
      className='flex justify-center items-center w-full bg-[#4b37dd] px-4 py-1 rounded-lg h-14 font-bold transition-all duration-200 hover:bg-indigo-700 hover:translate-y-0.5 outline-none hover:outline-none'
      onClick={() => claimFarming()}>
      Claim {formatMiningNumber(minedAmount)}
    </button>
  );
};

export default TimeCount;
