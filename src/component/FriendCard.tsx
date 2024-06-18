interface FriendCardProps {
  name: string;
  role: string;
  profit: string;
  value: string;
}
const FriendCard: React.FC<FriendCardProps> = ({
  name,
  value,
  role,
  profit,
}) => {
  return (
    <div className="customCard grid grid-col-1  grid-col-1 w-full">
      <div className="group rounded-xl p-3 sm:p-4 md:p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex grid-cols-2 gap-3 w-full">
          <img
            src="/image/hamster.png"
            alt=""
            className="w-12 h-12 max-sm:w-10 max-sm:h-10"
          />
          <div className="flex flex-row w-full justify-between">
            <div className="space-y-3 max-sm:space-y-1">
              <p className=" text-lg font-semibold text-left max-sm:text-sm">
                {name}
              </p>
              <div className="flex items-center">
                <p className=" max-sm:text-sm">{role}</p>
                <img
                  src="/image/dollar.png"
                  alt=""
                  className="w-4 h-4 ml-1 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
                <p className="text-orange-400">+{profit}</p>
              </div>
            </div>
            <div className="flex items-center">
              <img src="/image/dollar.png" alt="" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              <p className="">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
