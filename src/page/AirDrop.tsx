import CheckCom from "../component/check";
const Airdrop = () => {
  return (
    <div className="flex flex-col justify-between h-full pl-2 pb-[30px] pt-[150px]">
      <h1 className="lilita text-[40px] font-bold p-2">
        coming soon!
      </h1>
      <div className="mt-6">
        <div className="flex items-center justify-start">
          <CheckCom flag={true} />
          <h2 className="text-[16px] ml-2 font-bold">Exchange negotiations</h2>
        </div>
        <img src="line.png" className="w-2 h-4 ml-3" />
        <div className="flex items-center justify-start">
          <CheckCom flag={true} />
          <h2 className="text-[16px] ml-2 font-bold">Market Maker negotiations</h2>
        </div>
        <img src="line.png" className="w-2 h-4 ml-3" />
        <div className="flex items-center justify-start">
          <CheckCom flag={true} />
          <h2 className="text-[16px] ml-2 font-bold text-left">
            Key partnerships are coming
          </h2>
        </div>
        <img src="line.png" className="w-2 h-4 ml-3" />
        <div className="flex items-center justify-start">
          <CheckCom flag={false} />
          <h2 className="text-[16px] ml-2 font-bold">Airdorp task list</h2>
        </div>
      </div>
    </div>
  );
};
export default Airdrop;
