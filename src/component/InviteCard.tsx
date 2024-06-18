interface InviteCardProps {
  title: string;
  profit: string;
}
const InviteCard: React.FC<InviteCardProps> = ({ title, profit }) => {
  return (
    <div className="customCard grid grid-col-1 grid-col-1 w-full">
      <div className="group rounded-3xl p-4 sm:p-5 md:p-6 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex max-sm:gap-1">
          <img
            src="/image/gift.png"
            alt=""
            className="w-16 h-14 max-sm:w-10 max-sm:h-9"
          />
          <div className=" space-y-1">
            <p className=" text-lg font-semibold text-left">
              {title}
            </p>
            <div className="flex">
              <img src="/image/dot.png" alt="" className="w-4 h-4 mt-1" />
              <img
                src="/image/dollar.png"
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 mt-1"
              />
              <p className="text-orange-400">&nbsp;+{profit}</p>
              <p className=" text-left">&nbsp;for you and your friend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
