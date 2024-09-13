import React from "react";
import { useState } from "react";
import "../App.css";
import TGImg from "../assets/tg.svg";
import XImg from "../assets/x.svg";
import DOGImg from "../assets/dogs.svg";
import TonImg from "../assets/tonkeeper.svg";
import GasImg from "../assets/gas.svg";
const ChannelLink = [
  {
    link:"#",
    img: TGImg,
    title: "DOGS Community",
  },
  {
    link:"#",
    img: XImg,
    title: "DOGS on X.COM",
  },
  {
    link:"#",
    img: DOGImg,
    title: "Boost DOGS",
  },
];

const WalletLink = [
  {
    link:"#",
    img: TonImg,
    title: "Install Tonkeeper",
  },
  {
    link:"#",
    img: GasImg,
    title: "Get Toncoin for gas",
  },
];

interface ClaimCardProps {
  flag: boolean;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ flag }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div
      className={`absolute bg-[#161616] rounded-xl flex flex-col w-full right-0 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform ${
        showModal ? "top-[100vh]" : "h-[100vh] top-[100px]"
      }`}
    >
      <div onClick={() => setShowModal(true)} className="closeBtn"></div>
      <div className="text-xl pt-3">Token claim hints</div>
      <div className="p-2">
        <div className="text-xl text-left py-2">Follow official channels</div>
        <div>
          {ChannelLink.map((data, index) => (
            <a href={data.link} className="text-[#acacac]">
              <div
                key={index}
                className="flex flex-row py-3 items-center text-base"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#282828]">
                  <img src={data.img} alt={"imgage"} />
                </div>
                <div className="pl-3">{data.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xl text-left py-2">Prepare your wallet</div>
        <div>
          {WalletLink.map((data, index) => (
            <a href={data.link} className="text-[#acacac]">
              <div
                key={index}
                className="flex flex-row py-3 items-center text-base"
              >
                <img src={data.img} alt={"imgage"} />
                <div className="pl-3">{data.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ClaimCard;
