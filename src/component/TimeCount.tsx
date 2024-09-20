import { useMemo } from "react";
import axios from "axios";
import { AnimatedCounter } from "react-animated-counter";
import {
  getHours,
  getMinutes,
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

  const receiveMinedAmount = () => {
    axios.get(`${ENDPOINT}/api/user/updatepoints/${userId}`).then((res) => {
      console.log("this is new res", res.data);
      setTotalTime(res.data.countDown);
      setRemainTime(1);
      setNotReceivedAmount(0);
    });
  };

  return notReceiveAmount === 0 ? (
    <div className='w-full bg-gray-500 text-gray-400 px-4 py-1 rounded-lg h-14'>
      <div className='flex justify-center items-center relative h-full'>
        <div className='flex h-full justify-center gap-1 items-center font-bold text-xl'>
          <AnimatedCounter value={Number(formatMiningNumber(minedAmount))} color="text-gray-400" incrementColor="text-gray-400" decrementColor="text-gray-400"/>
          <p>Farming</p>
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
          {/* <div>
            <p>{miningSecond}</p>
            <p className='uppercase'>secs</p>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <div
      className='flex justify-center items-center w-full bg-green-400 px-4 py-1 rounded-lg h-14'
      onClick={() => receiveMinedAmount()}>
      Claim {formatMiningNumber(notReceiveAmount)}
    </div>
  );
};

export default TimeCount;
