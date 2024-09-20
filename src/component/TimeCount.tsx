import { useMemo } from "react";
import {
  getHours,
  getMinutes,
  getSeconds,
  formatMiningNumber,
} from "../utils/functions";
import {
    useTimeContext,
  } from "../context/TimeContextProvider";

const TimeCount = () => {
  const { remainTime, setRemainTime, minedAmount, setMinedAmount } = useTimeContext();

  const miningHour = useMemo(() => {
    return getHours(remainTime);
  }, [remainTime]);

  const miningMinute = useMemo(() => {
    return getMinutes(remainTime);
  }, [remainTime]);

  const miningSecond = useMemo(() => {
    return getSeconds(remainTime);
  }, [remainTime]);

  const startMining = () => {
    setMinedAmount(0);
    setRemainTime(5);
  };

  return remainTime !== 0 ? (
    <div className='w-full bg-[#4b37dd] px-4 py-1 rounded-2xl h-14'>
      <div className='flex justify-between items-center'>
        <div className='uppercase'>
          {formatMiningNumber(minedAmount)} earning
        </div>
        <div className='flex gap-2'>
          <div>
            <p>{miningHour}</p>
            <p className='uppercase'>hours</p>
          </div>
          <div>
            <p>{miningMinute}</p>
            <p className='uppercase'>mins</p>
          </div>
          <div>
            <p>{miningSecond}</p>
            <p className='uppercase'>secs</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className='flex justify-center items-center w-full bg-[#4b37dd] px-4 py-1 rounded-2xl h-14'
      onClick={() => startMining()}>
      Claim {minedAmount}
    </div>
  );
};

export default TimeCount;
