interface FriendCardProps {
  name: string;
  role: string;
  level: number;
  value: string;
}
const FriendCard: React.FC<FriendCardProps> = ({
  name,
  value,
  role,
  level,
}) => {
  return (
    <div className="customCard-container right-skew grid grid-col-1  grid-col-1 w-full">
      <div className="customCard right-skew group rounded-[10px] p-2 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <img
            src="friend-icon.svg"
            alt=""
            className="w-8 h-8"
          />
          <div className="flex flex-row w-full justify-between">
            <div className="space-y-1 max-sm:space-y-1">
              <p className="text-[14px] font-bold text-left max-sm:text-sm">
                {name}
              </p>
              <div className="flex items-center">
                <p className="text-[12px]">{role}</p>
                <img
                  src="dollar.png"
                  alt=""
                  className="w-4 h-4 ml-1"
                />
                <h3 className="text-[12px] font-bold">Level: {level}</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src="dollar.png" alt="" className="w-8 aspect-square" />
            <h3 className="text-[12px] font-bold">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
