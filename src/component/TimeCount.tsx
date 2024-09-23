import { useMemo, useState } from "react";
import axios from "axios";
import { AnimatedCounter } from "react-animated-counter";
import ConfettiExplosion from "react-confetti-explosion";
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
    claimed,
    isTimingStarted,
    remainTime,
    setRemainTime,
    minedAmount,
    totalTime,
    setTotalTime,
    userId,
    setIsTimingStarted,
    setMinedAmount,
    setNotReceivedAmount,
    setClaimed,
    setTotalPoints,
  } = useTimeContext();
  const [isClaimed, setIsClaimed] = useState(false);

  const miningHour = useMemo(() => {
    return getHours(totalTime - remainTime >= 0 ? totalTime - remainTime : 0);
  }, [remainTime]);

  const miningMinute = useMemo(() => {
    return getMinutes(totalTime - remainTime >= 0 ? totalTime - remainTime : 0);
  }, [remainTime]);
  const miningSecond = useMemo(() => {
    return getSeconds(totalTime - remainTime >= 0 ? totalTime - remainTime : 0);
  }, [remainTime]);

  const claimFarming = () => {
    if (isClaimed) return;
    setIsClaimed(true);
    console.log("claim Farming click", minedAmount);
    axios
      .get(`${ENDPOINT}/api/user/updatepoints/${userId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true", // or any value you prefer
        },
      })
      .then((res) => {
        console.log("Receive Amount Response > ", res.data);
        setTotalTime(res.data.remainTime);
        setRemainTime(0);
        setNotReceivedAmount(0);
        setTotalPoints(res.data.user.totalPoints);
        setMinedAmount(0);
        setClaimed(res.data.user.cliamed);
      })
      .catch((err) => console.log("Receive Amount Error > ", err));
  };

  const startFarming = async () => {
    setIsClaimed(false);
    await axios
      .post(`${ENDPOINT}/api/user/start/${userId}`)
      .then((res) => {
        console.log("Start Farming Response > ", res);
        setIsTimingStarted(true);
        setTotalTime(res.data.cycleTime);
      })
      .catch((err) => console.log("Start Farming Error > ", err));
  };

  return (
    <div className='w-full justify-center items-center relative'>
      {/* {totalTime > 0 ? ( */}
      {claimed ? (
        isTimingStarted ? (
          <div className='w-full bg-gray-500 text-gray-400 px-4 py-1 rounded-lg h-14 transition-all duration-200'>
            <div className='flex justify-center items-center relative h-full'>
              <div className='flex h-full justify-center gap-2 items-center font-bold text-xl'>
                <p>Farming</p>
                <AnimatedCounter
                  // value={minedAmount}
                  value={Number(formatMiningNumber(minedAmount))}
                  decimalPrecision={1}
                  color='text-gray-400'
                  // includeDecimals={false}
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
          className='flex justify-center items-center w-full bg-green-700 px-4 py-1 rounded-lg h-14 font-bold transition-all duration-200 hover:bg-green-800 hover:translate-y-0.5 outline-none hover:outline-none'
          onClick={() => claimFarming()}>
          Claim {Number(formatMiningNumber(minedAmount))} $Buffy
        </button>
      )}
      {/* ==================================================== For Convetti ================================================================= */}
      <button className='absolute top-2 opacity-0 pointer-events-none'>
        {isClaimed && (
          <ConfettiExplosion
            className='self-center'
            duration={4000}
            force={0.8}
            particleSize={8}
            particleCount={150}
            width={1600}
            // onComplete={() => claimFarmingCore()}
          />
        )}
      </button>
    </div>
  );
};

export default TimeCount;
