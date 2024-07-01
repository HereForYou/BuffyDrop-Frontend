import ExpCard from "../Card";

const AnalysisCard = ({ level }: { level: any }) => {
  return (
    <div className="flex flex-col-3 sm:gap-1 md:gap-2 lg:gap-3 justify-between items-center w-full">
      <ExpCard earn="Earn per tap" profit={`+${level.earnPerSecond}`} flag={true} />
      <ExpCard
        earn="Profit per hour"
        profit={`Level:${level.level}`}
        flag={false}
      />
      <ExpCard
        earn="Coins to level up"
        profit={`+${level.coinsToLevelUp}`}
        flag={false}
      />
    </div>
  );
};

export default AnalysisCard;
