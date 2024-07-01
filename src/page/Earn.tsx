import EarnCard from "../component/EarnCard";

const Tasks = [
  {
    id: "telegram",
    title: "Join our TG channel",
    image: "telegram.svg",
    profit: 1000,
    flag: true,
  },
  {
    id: "Youtube",
    title: "Get Exclusive listing info",
    image: "youtube.svg",
    profit: 1000,
    flag: false,
  },
  {
    id: "Twitter",
    title: "Follow your X account",
    image: "twitter.svg",
    profit: 1000,
    flag: true,
  },
  {
    id: "Choose",
    title: "Choose",
    image: "choose.svg",
    profit: 1000,
    flag: true,
  },
]

const Earn = () => {
  return (
    <div className="pb-[40px]">
      <p className="lilita text-3xl font-bold p-4 text-white">Earn More $BLEGGS</p>
      <p className="lilita text-xl font-bold text-left text-white">Daily tasks</p>
      <div className="py-2">
        <EarnCard
          title="Daily rewoard"
          image="gift.svg"
          profit={1000}
          flag={true}
        />
      </div>
      <div className="flex flex-row justify-between items-center pb-2">
        <p className="lilita text-white text-left text-xl font-semibold">
          Tasks List
        </p>
      </div>
      <div className="space-y-2">
        {
          Tasks.map((task) => (
            <EarnCard
              key={task.id}
              title={task.title}
              image={task.image}
              profit={task.profit}
              flag={task.flag}
            />
          ))
        }
      </div>
    </div>
  );
};
export default Earn;
