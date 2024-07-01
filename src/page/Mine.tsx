import ProgressBar from "../component/ProgressBar";

function Mine() {
  return (
    <div className="pb-[40px]">
      <div className="h-full w-full flex flex-col text-center items-center justify-between py-2 gap-4">
        <div className="flex flex-row w-full items-center justify-center gap-4 text-[16px] font-extrabold">
          <div className="customCard-container w-[55%]">
            <div className="customCard group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <h2 className="text-[16px]">Difficulties will<br />increase in</h2>
            </div>
          </div>
          <div className="customCard-container w-[45%]">
            <div className="customCard group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <h2 className="text-[16px]">Mining<br />Power</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img className="logo h-[100px] aspect-square rounded-full" src="dollar.png" alt="logo" />
          <div className="flex flex-col balance gap-2 w-full">
            <h1 className="font-bold text-[30px] ">684243</h1>
          </div>
        </div>
        <div className="customCard-container w-full">
          <div className="customCard bg-[#023744] group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
            <h2 className="text-[16px] font-bold text-white">Here you can Update your Miner</h2>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4 text-[16px] font-extrabold">
          <div className="customCard-container w-[30%]">
            <div className="customCard flex flex-col items-center justify-center group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <div className="bg-white p-[6px] h-[60px] w-[60px] rounded-full">
                <div className="customBtn startBt aspect-square rounded-full">
                </div>
              </div>
              <h2 className="text-[16px]">Mining<br />Time</h2>
            </div>
          </div>
          <div className="customCard-container w-[30%]">
            <div className="customCard flex flex-col items-center justify-center group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <div className="bg-white p-[6px] h-[60px] w-[60px] rounded-full">
                <div className="customBtn startBt aspect-square rounded-full">
                </div>
              </div>
              <h2 className="text-[16px]">Miner<br />Power</h2>
            </div>
          </div>
        </div>
        <ProgressBar value={70} />
        <div className="customCard-container w-full">
          <div className="customCard bg-[#023744] group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
            <div className="flex flex-row justify-between py-4 px-4">
              <h2 className="text-[16px] font-bold text-white">Mining Time</h2>
              <h2 className="text-[13px] text-[#FFF8E1]">Upgrade your daily mining Time</h2>
            </div>
            <h2 className="text-[16px] font-bold text-[#FFD798]">Your Current Mining Time Limit 30 Min</h2>
            <div className="p-2">
              <hr />
            </div>
            <div className="flex flex-row items-center justify-between text-[#FFD798]">
              <div className="flex flex-row gap-1">
                <img src="dollar.png" alt="dollar" className="h-[30px]" />
                <div className="flex items-center justify-center">
                  <h2 className="text-[16px] font-bold text-white">Upgrade to 60 Min</h2>
                </div>
              </div>
              <h2 className="text-[16px] font-bold text-white">Cost 500K $ BLEGGS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mine;
