import React from "react";
import ProgressBar from "../component/ProgressBar";
import Loader from "../component/Loader";
import axios from "axios";
import { ENDPOINT } from "../data";
import ExchangeSelector from "../component/exchangeSelector";

interface IHomeProps {
  user: any;
  point: number;
  totalPoint: number;
  handleMining: () => void;
  handleStopMining: () => void;
  setTotalPoint: (value: number) => void;
  setClaimShow: (status: boolean) => void;
  start: boolean;
  hour: number;
  min: number;
  sec: number;
  claimShow: boolean;
  power: any;
  timeLimit: any;
  level: any;
  nextLevel: any;
  loading: boolean;
  reachDailyLimit: boolean;
  setReachDailyLimit: (status: boolean) => void;
  setting: any;
  exchange:any;
}
const Exchange: React.FC<IHomeProps> = ({ user, point, totalPoint, handleMining, handleStopMining, claimShow, reachDailyLimit, setReachDailyLimit, setTotalPoint, setClaimShow, start, hour, min, sec, timeLimit, power, level, nextLevel, loading, setting, exchange }) => {
  const handleClaim = () => {
    if (user) {
      axios.put(`${ENDPOINT}/api/user/${user?.id}`, { points: point, countDown: 0 })
        .then(response => {
          console.log("response", response.data);
          let newpoint = point + totalPoint;
          setTotalPoint(newpoint);
          setClaimShow(false);
          setReachDailyLimit(true);
        })
        .catch(err => {
          console.error(err);
          // toast("Something Went Wrong!");
        })
    }
  }
  return (
    <div className="h-full flex flex-col text-center items-center justify-between py-2">
      {
        start ? (
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-between items-baseline">
              <img src="logo.png" alt="logo" className="h-[80px]" />
              {
                loading ? (
                  <Loader width="15" />
                ) : (
                  <h1 className="font-bold text-[30px] text-white">
                    {totalPoint}&nbsp;$BLEGGS
                  </h1>
                )
              }
            </div>
            <div className="customCard w-full py-[2px]"></div>
          </div>
        ) : (
          <>
            <div className="customCard-container w-full">
              <div className="flex flex-row items-center w-full justify-between py-1">
                <img src={'dollar.png'} className={`rounded-full overflow-hidden w-8 h-8`} />
                <ExchangeSelector setting={setting} user = {user} exchange = {exchange} />
              </div>
              <div className="customCard group py-4 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]">
                <h2 className="text-[24px] font-extrabold">$BLEGGS Miner</h2>
              </div >
            </div >
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <img className="logo h-[60px] w-[60px] rounded-full" src="dollar.png" alt="logo" />
              <div className="flex flex-col balance gap-2 w-full">
                {
                  loading ? (
                    <Loader width="15" />
                  ) : (
                    <h1 className="font-bold text-[30px] text-white">
                      {totalPoint}$BLEGGS
                    </h1>
                  )
                }
                <div className="flex flex-row w-full justify-between items-center text-white">
                  {
                    loading ? (
                      <Loader width="15" />
                    ) : (
                      <h3 className="text-[13px] font-bold">Level{level.level}</h3>
                    )
                  }
                  {
                    loading ? (
                      <Loader width="15" />
                    ) : (
                      <h3 className="text-[13px] font-bold">Level{nextLevel.level}</h3>
                    )
                  }
                </div>
                <ProgressBar value={(totalPoint - level.coinsToLevelUp) / (nextLevel.coinsToLevelUp - level.coinsToLevelUp) * 100} />
              </div>
            </div>
          </>
        )
      }
      {
        !start ? (
          claimShow ? (
            <div className="bg-white p-[10px] rounded-full">
              <button onClick={handleClaim} className="customBtn startBt aspect-square rounded-full py-2 px-4">
                <h2 className="text-[30px] font-bold">CLAIM</h2>
              </button>
            </div>
          ) : (
            reachDailyLimit ? (
              <h2 className="text-[16px] text-white" > You reached out the timeLimit</h2>
            ) : (
              <div className="bg-white p-[10px] rounded-full">
                <button onClick={handleMining} className="customBtn startBt aspect-square rounded-full py-2 px-4">
                  <h2 className="text-[30px] font-bold">START<br />MINING</h2>
                </button>
              </div>
            )
          )
        ) : (
          <>
            <div className="bg-white p-[10px] rounded-full">
              <button onClick={handleStopMining} className="customBtn stopBtn aspect-square rounded-full py-2 px-4">
                <h2 className="text-[30px] font-bold">STOP<br /> MINING</h2>
              </button>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="customCard-container font-bold">
                <div className="customCard flex flex-row w-full  justify-between items-center">
                  <h2 className="earning text-[24px]">{point}</h2>
                  <section className="flex flex-row gap-4">
                    {loading ? (
                      <>
                        <div className="flex flex-col text-center">
                          <Loader width="15" />
                          <h4 className="text-[12px]">Hours</h4>
                        </div>
                        <div className="flex flex-col text-center">
                          <Loader width="15" />
                          <h4 className="text-[12px]">Mins</h4>
                        </div>
                        <div className="flex flex-col text-center">
                          <Loader width="15" />
                          <h4 className="text-[12px]">Secs</h4>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col text-center">
                          <h3 className="text-[16px]">{hour}</h3>
                          <h4 className="text-[12px]">Hours</h4>
                        </div>
                        <div className="flex flex-col text-center">
                          <h3 className="text-[16px]">{min}</h3>
                          <h4 className="text-[12px]">Mins</h4>
                        </div>
                        <div className="flex flex-col text-center">
                          <h3 className="text-[16px]">{sec}</h3>
                          <h4 className="text-[12px]">Secs</h4>
                        </div>
                      </>
                    )}
                  </section>
                </div >
              </div>
            </div>
          </>
        )
      }
      <div className="flex flex-row items-center justify-start w-full text-[20px] text-white lilita">
        <img src="boost.png" alt="boost" className="h-[40px] aspect-square" />
        {
          loading ? (
            <Loader width="20" />
          ) : (
            <h2>{power.value} MH /&nbsp;<span>{timeLimit.value} Min</span></h2>
          )
        }
      </div>
    </div >
  )
}

export default Exchange;