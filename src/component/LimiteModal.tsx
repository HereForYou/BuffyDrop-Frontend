import "../App.css";
interface LimiteModalProps {
  handleClose: () => void;
}

const LimiteModal = ({ handleClose }: LimiteModalProps) => {
  return (
    <div className='absolute bg-[#4b37dd] rounded-xl flex flex-col left-0 right-0 bottom-0 z-50 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform'>
      <div onClick={handleClose} className='closeBtn'></div>
      
      <div className='flex flex-col justify-between gap-5 text-base'>
      
        <div className='pt-3 text-left text-sm'>
        <div className='h-[5px] rounded-full w-[60px] bg-black opacity-80 self-center mx-auto mb-1'></div>
          <p className="text-white text-xl font-extrabold text-center">Rewards</p>
          The referral reward changes based on the rank of the user when they
          joined the bot:
        </div>
        <div className='text-start flex flex-col gap-[2px] text-sm '>
          <div className="flex justify-between px-3 py-1">
            <p>Rank</p>
            <p>Reward</p>
          </div>
          <div className='rounded-lg px-3 py-[2px] flex justify-between items-center bg-black'>
            {" "}
            <p> Rank 1 to 10 </p>
            <p> 10.01%</p>{" "}
          </div>
          <div className='bg-black bg-opacity-90 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 10 to 100</p> <p> 10.00%</p>
          </div>
          <div className='bg-black bg-opacity-80 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 100 to 1,000</p> <p> 9.96% </p>
          </div>
          <div className='bg-black bg-opacity-75 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 1,000 to 10,000 </p>
            <p> 9.49% </p>
          </div>
          <div className='bg-black bg-opacity-70 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 10,000 to 100,000</p> <p> 6.65% </p>
          </div>
          <div className='bg-black bg-opacity-65 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 100,000 to 1,000,000</p> <p> 1.90% </p>
          </div>
          <div className='bg-black bg-opacity-60 rounded-lg px-3 py-[2px] flex justify-between items-center'>
            {" "}
            <p>Rank 1,000,000 to 10,000,000</p>{" "}
            <p>
              {" "}
              <span className="text-[10px]">(minimum reward)</span>1.00%{" "}
            </p>
          </div>
        </div>
        <div className="text-sm">
          The inviter receives this percentage from the new user's token reward
          after they join the bot.
        </div>
      </div>
    </div>
  );
};
export default LimiteModal;
