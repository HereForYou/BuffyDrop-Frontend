interface IFooterProps {
  tab: string;
  setTab: (status: string) => void;
}
const tabs = [
  {
    id: "Mine",
    name: "Leaderboard",
    img: "rank.svg"
  },
  {
    id: "Friends",
    name: "Referrals",
    img: "referral.svg"
  },
  {
    id: "Exchange",
    name: "Home",
    img: "home.svg"
  },
  {
    id: "Earn",
    name: "Daily Tasks",
    img: "task.svg"
  },
  {
    id: "Airdrop",
    name: "Miner",
    img: "badge.svg"
  },

]
const Footer: React.FC<IFooterProps> = ({ tab, setTab }) => {
  const handleClick = (tab: string) => {
    setTab(tab);
  }
  return (
    <div className="footer grid grid-cols-5 justify-between absolute z-10 h-[60px] w-full lg:w-[30%] bottom-0 items-center px-4 rounded-2xl">
      {
        tabs.map((item, index) => (
          <div key={index} onClick={() => handleClick(item.id)} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition 
            ${item.id === tab
              ? "scale-[110%]"
              : "opacity-60"
            }`}>
            <div className={`flex flex-col items-center justify-center font-extrabold ${item.id === tab && 'border-b-2 border-[#D18729]'} gap-1`}>
              <img
                src={item.img}
                alt="play"
                className="w-5 h-5"
              />
              <h3 className="text-[10px]">{item.name}</h3>
            </div>
          </div>
        ))
      }
    </div >
  );
}
export default Footer;