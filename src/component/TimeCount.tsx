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
    setClaimed,
    setTotalPoints,
  } = useTimeContext();
  const [isClaimed, setIsClaimed] = useState(false);
  const elapsedTime = totalTime - remainTime >= 0 ? totalTime - remainTime : 0;

  const miningHour = useMemo(() => {
    return getHours(elapsedTime >= 0 ? elapsedTime : 0);
  }, [elapsedTime]);

  const miningMinute = useMemo(() => {
    return getMinutes(elapsedTime >= 0 ? elapsedTime : 0);
  }, [elapsedTime]);
  const miningSecond = useMemo(() => {
    return getSeconds(elapsedTime >= 0 ? elapsedTime : 0);
  }, [elapsedTime]);

  const claimFarming = async () => {
    if (isClaimed) return;
    setIsClaimed(true);

    try {
      const { data } = await axios.get(
        `${ENDPOINT}/api/user/updatepoints/${userId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      console.log("Receive Amount Response > ", data);
      setTotalTime(data.remainTime);
      setRemainTime(0);
      setTotalPoints(data.user.totalPoints);
      setMinedAmount(0);
      setClaimed(data.user.cliamed);
      setIsTimingStarted(data.user.isStarted);
    } catch (err) {
      console.error("Receive Amount Error > ", err);
      // Consider adding user feedback here
    }
  };

  const startFarming = async () => {
    setIsClaimed(false);

    try {
      const { data } = await axios.post(`${ENDPOINT}/api/user/start/${userId}`);
      console.log("Start Farming Response > ", data);
      setIsTimingStarted(data.user.isStarted);
      setTotalTime(data.cycleTime);
      setClaimed(data.user.cliamed);
    } catch (err) {
      console.error("Start Farming Error > ", err);
      // Consider adding user feedback here
    }
  };

  return (
    <div className='w-full justify-center items-center relative'>
      {/* {totalTime > 0 ? ( */}
      {isTimingStarted ? (
        !claimed ? (
          <button
            className='flex justify-center items-center w-full bg-green-700 px-4 py-1 rounded-lg h-14 font-bold transition-all duration-200 hover:bg-green-800 hover:translate-y-0.5 outline-none hover:outline-none'
            onClick={() => claimFarming()}>
            Claim {Number(formatMiningNumber(minedAmount))} $Buffy
          </button>
        ) : (
          <div className='w-full bg-gray-500 text-gray-400 px-4 py-1 rounded-lg h-14 transition-all duration-200'>
            <div className='flex justify-center items-center relative h-full'>
              <div className='flex h-full justify-center gap-2 items-center font-bold text-base xxs:text-xl'>
                <p>Farming</p>
                <AnimatedCounter
                  // value={minedAmount}
                  value={Number(formatMiningNumber(minedAmount))}
                  decimalPrecision={1}
                  color='text-gray-400'
                  // includeDecimals={false}
                  incrementColor='text-gray-400'
                  decrementColor='text-gray-400'
                  fontSize="xxs:text-xl text-base"
                />
              </div>
              <div className='flex gap-0 absolute right-0 top-0 justify-center text-sm items-center h-full xxs:gap-1'>
                <div className='flex'>
                  <p>{miningHour}</p>
                  <p className="xxs:block hidden">h</p>
                  <p className="xxs:hidden block">:</p>
                </div>
                <div className='flex'>
                  <p>{miningMinute}</p>
                  <p className="xxs:block hidden">m</p>
                  <p className="xxs:hidden block">:</p>
                </div>
                <div className='flex'>
                  <p>{miningSecond}</p>
                  <p className="xxs:block hidden">s</p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <button
          className='flex justify-center items-center h-14 w-full bg-white text-black rounded-lg font-bold transition-all duration-200 hover:translate-y-[2px]'
          onClick={() => startFarming()}>
          Start farming
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
