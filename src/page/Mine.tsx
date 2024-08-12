import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Loader from "../component/Loader";
import ProgressBar from "../component/ProgressBar";

import { ENDPOINT } from "../data";

interface IMineProps {
  user: any;
  power: any;
  setPower: (value: any) => void;
  timeLimit: any;
  setTimeLimit: (value: any) => void;
  setTotalPoint: (value: number) => void;
  currentCount: number;
  setCurrentCount: (value: number) => void;
  totalPoint: number;
  level: any;
  nextLevel: any;
  setting: any;
  loading: boolean;
}

const Mine: React.FC<IMineProps> = ({ level, nextLevel, loading, user, power, setPower, timeLimit, setTimeLimit, totalPoint, setTotalPoint, currentCount, setCurrentCount, setting }) => {
  const [tab, setTab] = useState<string>('time');
  const handleBoost = () => {
    if (tab == 'time' && setting.dailyTimeLimitList[timeLimit.id]) {
      if (totalPoint >= setting.dailyTimeLimitList[timeLimit.id].coinsToBoost) {
        let newTimeLimit = setting.dailyTimeLimitList[timeLimit.id];
        let fee = setting.dailyTimeLimitList[timeLimit.id].coinsToBoost;
        let plusCountDown = (setting.dailyTimeLimitList[timeLimit.id].value - setting.dailyTimeLimitList[timeLimit.id - 1].value) * 60;
        axios.put(`${ENDPOINT}/api/user/timeLimit/${user?.id}`, { newTimeLimit, fee, plusCountDown })
          .then(res => {
            if (res.data) {
              toast.success("Boosted successfully!");
              let newPoint = totalPoint - setting.dailyTimeLimitList[timeLimit.id].coinsToBoost;
              setTotalPoint(newPoint);
              let newCounts = currentCount + plusCountDown;
              setCurrentCount(newCounts);
              setTimeLimit(setting.dailyTimeLimitList[timeLimit.id]);
            }
          })
          .catch(err => {
            console.error(err);
          })
      }
      else {
        toast.error("Your Balance is not enough.");
      }
    }
    else if (tab == 'power' && setting.powerList[power.id]) {
      if (totalPoint >= setting.powerList[power.id].coinsToBoost) {
        axios.put(`${ENDPOINT}/api/user/power/${user?.id}`, { newPower: setting.powerList[power.id], fee: setting.powerList[power.id].coinsToBoost })
          .then(res => {
            if (res.data) {
              toast.success("Boosted successfully!");
              let newPoint = totalPoint - setting.powerList[power.id].coinsToBoost;
              setTotalPoint(newPoint);
              setPower(setting.powerList[power.id]);
            }
          })
          .catch(err => {
            console.error(err);
          })
      }
      else {
        toast.error("Your Balance is not enough.");
      }
    }
  }
  return (
    <div className="pb-[40px]">
      <div className="w-full flex flex-col text-center items-center py-2 gap-4">
        <div className="w-full customCard-container text-[16px] font-extrabold">
          <div className="customCard group w-full py-2 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]">
            <h2 className="text-[16px]">Wallet Connect .. Soon</h2>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img className="logo h-[50px] aspect-square rounded-full" src="dollar.png" alt="logo" />
          <div className="flex flex-col balance gap-2 w-full">
            <h1 className="font-bold text-[30px] text-white">&nbsp;{totalPoint}</h1>
          </div>
        </div>
        <div className="customCard-container w-full">
          <div className="customCard bg-[#023744] group w-full py-2 transition relative duration-300 cursor-default">
            <h2 className="text-[16px] font-bold text-white">Here you can Update your Miner</h2>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4 text-[16px] font-extrabold">
          <div onClick={() => setTab('time')} className="customCard-container w-[30%]">
            <div className={`customCard flex flex-col items-center justify-center group w-full py-2 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:bg-inherit ${tab == 'time' && 'bg-inherit'} hover:shadow-[0 -8px 0px 0px #2196f3]`}>
              <div className="bg-white p-[4px] h-[40px] w-[40px] rounded-full">
                <div className="customBtn startBt aspect-square rounded-full">
                </div>
              </div>
              <h2 className="text-[16px]">Mining<br />Time</h2>
            </div>
          </div>
          <div onClick={() => setTab('power')} className="customCard-container w-[30%]">
            <div className={`customCard flex flex-col items-center justify-center group w-full py-2 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:bg-inherit ${tab == 'power' && 'bg-inherit'} hover:shadow-[0 -8px 0px 0px #2196f3]`}>
              <div className="bg-white p-[4px] h-[40px] w-[40px] rounded-full">
                <div className="customBtn startBt aspect-square rounded-full">
                </div>
              </div>
              <h2 className="text-[16px]">Miner<br />Power</h2>
            </div>
          </div>
        </div>
        <div className="w-full space-y-2">
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
        <div className="customCard-container w-full">
          <div onClick={handleBoost} className="customCard bg-[#023744] group w-full py-2 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:bg-inherit hover:shadow-[0 -8px 0px 0px #2196f3]">
            {
              tab == 'time' && (
                <div className="flex flex-row items-center justify-between p-2">
                  <h2 className="text-[12px] font-bold text-white">Mining Time</h2>
                  <h2 className="text-[11px] text-[#FFF8E1]">Upgrade your daily mining Time</h2>
                </div>
              )
            }
            {
              tab == 'power' && (
                <div className="flex flex-row items-center justify-between p-2">
                  <h2 className="text-[12px] font-bold text-white">Miner Power</h2>
                  <h2 className="text-[11px] text-[#FFF8E1]">Upgrade your Miner</h2>
                </div>
              )
            }
            {
              tab == 'time' && (
                <h2 className="text-[12px] font-bold text-[#FFD798]">Your Current Mining Time Limit {timeLimit?.value} Min</h2>
              )
            }
            {
              tab == 'power' && (
                <h2 className="text-[12px] font-bold text-[#FFD798]">Your Current Miner Power {power?.value}</h2>
              )
            }
            <div className="p-2">
              <hr />
            </div>
            <div className="flex flex-row items-center justify-between text-[#FFD798] w-full">
              <div className="flex flex-row gap-1 w-full">
                <img src="dollar.png" alt="dollar" className="h-[20px]" />
                <div className="flex flex-row items-center justify-center gap-2">
                  {
                    tab == 'time' && (
                      setting?.dailyTimeLimitList[timeLimit.id] ? (
                        <>
                          <h2 className="text-[11px] font-bold text-white">Upgrade to {setting?.dailyTimeLimitList[timeLimit.id].value} Min </h2>
                          <h2 className="text-[11px] font-bold text-white">Cost {setting?.dailyTimeLimitList[timeLimit.id].coinsToBoost} $ BLEGGS</h2>
                        </>
                      ) : (
                        <>
                          <h2 className="text-[11px] font-bold text-white">You have top mining time!</h2>
                        </>
                      )
                    )
                  }
                  {
                    tab == 'power' && (
                      setting?.powerList[power.id] ? (
                        <>
                          <h2 className="text-[11px] font-bold text-white">Upgrade to {setting?.powerList[power.id].value}MH/s</h2>
                          <h2 className="text-[11px] font-bold text-white">Cost {setting?.powerList[power.id].coinsToBoost} $ BLEGGS</h2>
                        </>
                      ) : (
                        <>
                          <h2 className="text-[11px] font-bold text-white">You have top mining power!</h2>
                        </>
                      )
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mine;
