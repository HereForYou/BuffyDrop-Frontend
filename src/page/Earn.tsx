import EarnCard from "../component/EarnCard";
const Earn = () => {
  return (
    <div className="pb-[84px]">
      <div className="flex justify-center items-center">
        <img src="image/dollar.png" className="w-32 h-32" />
      </div>
      <p className=" text-3xl font-bold p-4">Earn More Money</p>
      <p className=" text-xl font-bold p-4 text-left">Daily tasks</p>
      <div className="py-3">
        <EarnCard
          title="Daily rewoard"
          image="image/cdollar.png"
          profit="234.3K"
          flag={true}
        />
      </div>
      <div className="flex flex-row justify-between items-center py-2">
        <p className="text-left py-2  text-xl font-semibold">
          Tasks List
        </p>
      </div>
      <div className="mt-3 space-y-2">
        <EarnCard
          title="Join our TG channel"
          image="image/tg.png"
          profit="234.3K"
          flag={true}
        />
        <EarnCard
          title="Get exclusive listing info"
          image="image/youtube.png"
          profit="5000"
          flag={true}
        />
        <EarnCard
          title="Join our TG channel"
          image="image/tg.png"
          profit="234.3K"
          flag={true}
        />
        <EarnCard
          title="Get exclusive listing info"
          image="image/youtube.png"
          profit="5000"
          flag={true}
        />
        <EarnCard
          title="Follow your X account"
          image="image/twitter.png"
          profit="234.3K"
          flag={true}
        />
        <EarnCard
          title="Choose"
          image="image/hy.png"
          profit="234.3K"
          flag={true}
        />
      </div>
    </div>
  );
};
export default Earn;
