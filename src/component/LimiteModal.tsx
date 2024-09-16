import "../App.css";
interface LimiteModalProps {
  handleClose: () => void;
}

const LimiteModal = ({ handleClose }: LimiteModalProps) => {
  return (
    <div className='absolute bg-[#4b37dd] rounded-xl flex flex-col left-0 right-0 bottom-0 z-50 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform'>
      <div onClick={handleClose} className='closeBtn'></div>
      <div className='flex flex-col justify-between gap-5 text-base'>
        <div className='pt-10'>
          The referral reward changes based on the rank of the user when they
          joined the bot:
        </div>
        <div className='text-start ml-4 flex flex-col gap-[2px]'>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p> Rank 1 to 10 </p>
            <p> 10.01%</p>{" "}
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 10 to 100</p> <p> 10.00%</p>
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 100 to 1,000</p> <p> 9.96% </p>
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 1,000 to 10,000 </p>
            <p> 9.49% </p>
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 10,000 to 100,000</p> <p> 6.65% </p>
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 100,000 to 1,000,000</p> <p> 1.90% </p>
          </div>
          <div className='bg-black rounded-lg px-3 py-[2px]'>
            {" "}
            <p>Rank 1,000,000 to 10,000,000</p>{" "}
            <p>
              {" "}
              <span>(minimum reward)</span>1.00%{" "}
            </p>
          </div>
        </div>
        <div>
          The inviter receives this percentage from the new user's token reward
          after they join the bot.
        </div>
      </div>
    </div>
  );
};
export default LimiteModal;
