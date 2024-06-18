import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IFooterProps {
  tab: string;
  setTab: (status: string) => void;
}
const tabs = [
  {
    name: "Exchange",
    img: "/image/mining.png"
  },
  {
    name: "Mine",
    img: "/image/axs.png"
  },
  {
    name: "Friends",
    img: "/image/friends.png"
  },
  {
    name: "Earn",
    img: "/image/earn.png"
  },
  {
    name: "Airdrop",
    img: "/image/hamstercoin.png"
  },

]
const Footer: React.FC<IFooterProps> = ({ tab, setTab }) => {
  const handleClick = (tab: string) => {
    setTab(tab);
  }
  return (
    <div className="flex flex-row justify-between absolute z-1 h-[80px] md:w-[30%] bottom-0 items-center border-[#2862e0] border-t-2 px-4 rounded-2xl bg-white">
      {
        tabs.map((item, index) => (
          <div key={index} onClick={() => handleClick(item.name)} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${item.name === tab
            ? "scale-[110%] opacity-100 p-1 lg:p-2 rounded-2xl font-extrabold"
            : "opacity-60"
            }`}>
            <img
              src={item.img}
              alt="play"
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
            <p className="text-[10px] lg:text-sm ">{item.name}</p>
          </div>
        ))
      }
    </div>
  );
}
export default Footer;