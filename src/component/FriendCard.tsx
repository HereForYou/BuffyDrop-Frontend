interface FriendCardProps {
  name: string;
  value: number;
}
const FriendCard: React.FC<FriendCardProps> = ({
  name,
  value,
}) => {
  return (
    <div className="flex flex-row items-center justify-between w-full px-6">
      <div className="flex flex-row items-center">
        <img
          src="friend-icon.svg"
          alt=""
          className="w-8 h-8"
        />
        <div className="text-sm px-4 w-full">
          {name}
        </div>
      </div>
      <div className="text-xs">
        {"+" + value.toFixed(2) + " BUFFYS"}
      </div>
    </div>
  );
};

export default FriendCard;
