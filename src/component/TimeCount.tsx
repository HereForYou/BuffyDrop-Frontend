import { useMemo } from "react";
import axios from "axios";
import {
  getHours,
  getMinutes,
  getSeconds,
  formatMiningNumber,
} from "../utils/functions";
import { useTimeContext } from "../context/TimeContextProvider";
import { ENDPOINT } from "../data";

const TimeCount = () => {
  const {
    remainTime,
    setRemainTime,
    minedAmount,
    totalTime,
    setTotalTime,
    notReceiveAmount,
    userId,
    setNotReceivedAmount,
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

  const receiveMinedAmount = () => {
    axios.get(`${ENDPOINT}/api/user/updatepoints/${userId}`).then((res) => {
      console.log("this is new res", res.data);
      setTotalTime(res.data.countDown);
      setRemainTime(1);
      setNotReceivedAmount(0);
    });
  };

  return notReceiveAmount === 0 ? (
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
      className='flex justify-center items-center w-full bg-orange-600 px-4 py-1 rounded-2xl h-14'
      onClick={() => receiveMinedAmount()}>
      Claim {formatMiningNumber(notReceiveAmount)}
    </div>
  );
};

export default TimeCount;
