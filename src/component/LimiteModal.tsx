import "../App.css";
interface LimiteModalProps {
  handleClose: () => void;
}

const LimiteModal = ({ handleClose }: LimiteModalProps) => {
  return (
    <div
      className="absolute bg-[#161616] rounded-xl flex flex-col left-0 right-0 bottom-0 z-50 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform"
    >
      <div onClick={handleClose} className="closeBtn"></div>
      <div className="flex flex-col justify-between gap-5 text-base">
        <div className="pt-10">
          The referral reward changes based on the rank of the user when they
          joined the bot:
        </div>
        <div className="text-start ml-4">
          <div> - Rank 1 to 10: 10.01% </div>
          <div> - Rank 10 to 100: 10.00%</div>
          <div> - Rank 100 to 1,000: 9.96% </div>
          <div> - Rank 1,000 to 10,000: 9.49% </div>
          <div> - Rank 10,000 to 100,000: 6.65% </div>
          <div> - Rank 100,000 to 1,000,000: 1.90% </div>
          <div> - Rank 1,000,000 to 10,000,000: 1.00% (minimum reward)</div>
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