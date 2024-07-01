interface InviteCardProps {
  title: string;
  profit: string;
}
const InviteCard: React.FC<InviteCardProps> = ({ title, profit }) => {
  return (
    <div className="customCard-container grid grid-col-1 grid-col-1 w-full">
      <div className="customCard group px-2 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <img
          src="gift.svg"
          alt=""
          className="w-12 h-12"
        />
        <div className=" space-y-1">
          <h2 className="text-[16px] text-left font-bold">
            {title}
          </h2>
          <div className="flex items-center justify-center">
            <img
              src="dollar.png"
              alt=""
              className="w-4 h-4 mt-1"
            />
            <h3 className="text-[12px] font-bold">&nbsp;+{profit}</h3>
            <h3 className="text-[12px] text-left">&nbsp;for you and your friend</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
