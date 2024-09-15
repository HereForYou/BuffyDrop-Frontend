import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../data";
import { toast } from "react-hot-toast";
import Setting from "./Setting";
import Channel from "../component/Channel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../App.css";
import WalletConnect from "../component/WalletConnect";
import ClaimCard from "../component/ClaimCard";
import { formatNumberWithCommas } from "../utils/functions";
import Loader from "../component/Loader";

const ChannelData = [
  {
    id: "Channel",
    title: "DAILY REWARD",
    comment: "Complete your daily tasks and earn rewards!",
    src: "/task_check.png",
    btnTitle: "Go",
  },
  {
    id: "INVITE",
    title: "INVITE YOUR FIRST FRIEND",
    comment: "Invite your first friend and earn a percentage of their Buffies as a bonus.",
    src: "/Invite_friend.png",
    btnTitle: "Invite",
  },
  {
    id: "Buffy",
    title: "BUFFY COMMUNITY",
    comment: "join buffy community channel",
    src: "/Invite_friends.png",
    btnTitle: "Join",
  },
];

interface IHomeProps {
  user: any;
  photo_url: string | null;
  point: number;
  totalPoint: number;
  handleMining: () => void;
  handleStopMining: () => void;
  setTotalPoint: (value: number) => void;
  setClaimShow: (status: boolean) => void;
  start: boolean;
  hour: number;
  min: number;
  sec: number;
  claimShow: boolean;
  timeLimit: any;
  level: any;
  nextLevel: any;
  loading: boolean;
  reachDailyLimit: boolean;
  setReachDailyLimit: (status: boolean) => void;
  setting: any;
  exchange: any;
  setExchange: (status: any) => void;
  tab: string;
  setTab: (status: string) => void;
  title: string;
  setTitle: (status: string) => void;
}
const Exchange: React.FC<IHomeProps> = ({
  user,
  setting,
  exchange,
  setExchange,
  tab,
  setTab,
  title,
  setTitle,
}) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [claim, setClaim] = useState(false);
  const [curUser, setCurUser] = useState<any>({});
  const [rank, setRank] = useState(0);
  useEffect(() => {
    axios
      .get(`${ENDPOINT}/api/user/top/${user.id}?num=100`, {
        headers: {
          "ngrok-skip-browser-warning": "true", // or any value you prefer
        },
      })
      .then((res) => {
        let userInfo = res.data;
        console.log("userInfo", userInfo);
        setCurUser(userInfo.curUser);
        setRank(userInfo.curUser.joinRank);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong!");
      });
  }, []);
  return showSetting ? (
    <Setting
      user={user}
      setting={setting}
      setShowSetting={setShowSetting}
      exchange={exchange}
      setExchange={setExchange}
    />
  ) : (
    <div className='h-full justify-between items-center pt-[2.5rem] pb-[2rem] gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar relative -top-10'>
      <div className='bg-[#046ae2] flex gap-1 px-6 pt-5 pb-10 w-full justify-between items-center'>
        <div className="flex gap-2">
          <img src='/x.svg' className='w-10' />
          <div className='flex flex-col text-white text-left justify-center text-xs sm:text-sm'>
            <p>Post a tweet about Buffy on X</p>
            <p>and receive extra rewards.</p>
          </div>
        </div>
        <button className='bg-white text-black rounded-full px-3 h-fit py-1 text-sm font-semibold hidden sm:block'>
          Post on X
        </button>
        <button className='bg-white text-black rounded-full px-3 h-fit py-1 text-sm font-semibold block sm:hidden'>
          Post
        </button>
      </div>
      <div className='relative rounded-2xl -top-5 w-full flex justify-between gap-2 items-center flex-col bg-black'>
      <div className="flex flex-col gap-4 justify-start w-full items-center">
        {claim && <ClaimCard handleClose={() => setClaim(false)} />}
        <div className='mt-5'>
          <WalletConnect />
        </div>
        <p>You’re user {rank} to join the BuffyDrop!</p>
        <img src='/dogAvatar.png' className='w-1/3'></img>
        <div>
          <p className='text-[34px]'>
            {!curUser ||
            formatNumberWithCommas(curUser?.totalPoints) == "NaN" ? (
              <div className='flex items-center justify-center w-full'>
                <Loader width='30' />
              </div>
            ) : (
              <p>{formatNumberWithCommas(curUser?.totalPoints)}</p>
            )}
          </p>
          <p className='text-[20px]'>$BUFFY</p>
        </div>
        <div className='flex flex-row gap-2 w-full'>
          <Carousel
            className='carousel-card relative -left-5'
            infiniteLoop={true}
            showArrows={false}
            showIndicators={true}
            showStatus={false}
            centerMode
            centerSlidePercentage={90}
            showThumbs={false}
            useKeyboardArrows={false}
            autoPlay={false}
            stopOnHover={false}
            swipeable={true}
            dynamicHeight={false}
            emulateTouch={true}
            autoFocus={false}>
            {ChannelData.map((idx, key) => (
              <Channel
                id={idx.id}
                heading={idx.title}
                comment={idx.comment}
                src={idx.src}
                key={key}
                tab={tab}
                setTab={setTab}
                title={title}
                setTitle={setTitle}
                btnTitle={idx.btnTitle}
              />
            ))}
          </Carousel>
        </div>
        </div>
        <button
          className='bg-[#110d33] w-full h-[2.5rem] leading-none mt-4'
          onClick={() => setClaim(true)}>
          Claim hint
        </button>
      </div>
    </div>
  );
};
export default Exchange;
