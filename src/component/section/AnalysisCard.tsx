import ExpCard from "../Card";
const AnaylsisCard = () => {
  return (
    <div className="flex flex-col-3 sm:gap-1 md:gap-2 lg:gap-3">
      <ExpCard earn="Earn per tap" profit="+8" flag={true} />
      <ExpCard
        earn="Coins to level up"
        profit="1M"
        flag={false}
      />
      <ExpCard
        earn="Profit per hour"
        profit="+612.15K"
        flag={false}
      />
    </div>
  );
};

export default AnaylsisCard;
