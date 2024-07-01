import React from "react";
import ProgressBar from "../component/ProgressBar";

interface IHomeProps {
  level: any;
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
}
const Exchange: React.FC<IHomeProps> = ({ level, user, point, totalPoint, handleMining, handleStopMining, claimShow, setTotalPoint, setClaimShow, start, hour, min, sec }) => {
  const handleClaim = () => {
    if (!user) {
      let newpoint = totalPoint + point;
      setTotalPoint(newpoint);
      setClaimShow(false);
    }
  }
  return (
    <div className="h-full flex flex-col text-center items-center justify-between py-2 px-4">
      <div className="customCard-container w-full">
        <div className="customCard group py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
          <h2 className="text-[24px] font-extrabold">$BLEGGS Miner</h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <img className="logo h-[120px] w-[120px] rounded-full" src="dollar.png" alt="logo" />
        <div className="flex flex-col balance gap-2 w-full">
          <h1 className="font-bold text-[30px] ">{totalPoint}$BLEGGS</h1>
          <ProgressBar value={70} />
        </div>
      </div>
      {
        !start ? (
          claimShow ? (
            <div className="bg-white p-[10px] rounded-full">
              <button onClick={handleClaim} className="customBtn startBt aspect-square rounded-full py-2 px-4">
                <h2 className="text-[30px] font-bold">CLAIM</h2>
              </button>
            </div>
          ) : (
            <div className="bg-white p-[10px] rounded-full">
              <button onClick={handleMining} className="customBtn startBt aspect-square rounded-full py-2 px-4">
                <h2 className="text-[30px] font-bold">START<br />MINING</h2>
              </button>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="customCard-container">
              <div className="customCard flex flex-row w-full justify-between items-center font-bold">
                <img src="/image/axs.png" alt="pick-icon" className="h-[30px] w-[30px]" />
                <h4 className="text-[20px]">{point.toFixed(3)}</h4>
              </div>
            </div>
            <div className="customCard-container font-bold">
              <div className="customCard flex flex-row w-full  justify-between items-center">
                <h2 className="earning text-[24px]">Earning</h2>
                <section className="flex flex-row gap-4">
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
                </section>
              </div >
            </div>
            <div className="customCard-container p-[4px] rounded-full">
              <div onClick={handleStopMining} className="customCard cursor-pointer py-2 rounded-full">
                <h2 className="text-[16px] font-bold">STOP MINING</h2>
              </div>
            </div>
          </div>
        )
      }
      <div className="flex flex-row items-center justify-start w-full text-[20px] text-white lilita">
        <img src="boost.png" alt="boost" className="h-[40px] aspect-square" />
        <h2>10 MH /&nbsp;</h2>
        <h2>30 Min</h2>
      </div>
    </div >
  )
}

export default Exchange;