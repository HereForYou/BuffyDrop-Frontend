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
    src: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    btnTitle: "Go",
  },
  {
    id: "INVITE",
    title: "INVITE YOUR FIRST FRIEND",
    comment:
      "Invite a friend and earn from their Buffies",
    src: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>,
    btnTitle: "Invite",
  },
  {
    id: "Buffy",
    title: "BUFFY COMMUNITY",
    comment: "join buffy community channel",
    src: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
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
        setCurUser(userInfo.curUser);
        setRank(userInfo.curUser.joinRank);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something Went Wrong!");
      });
  }, []);

  const handleFollow = () => {
      axios
        .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
          id: 'twitter',
          profit: 1000
        })
        .then(res => {
          console.log("res", res)
        })
        .catch(err => {
          console.error('er', err)
        })
      window.open('https://twitter.com/BuffyDrops', '_blank')
  }

  return showSetting ? (
    <Setting
      user={user}
      setting={setting}
      setShowSetting={setShowSetting}
      exchange={exchange}
      setExchange={setExchange}
    />
  ) : (
    <div className='h-full justify-between items-center pt-[2.5rem] gap-2 overflow-y-auto w-full overflow-x-hidden hiddenScrollBar relative -top-10'>
      <div className='bg-[#046ae2] flex gap-1 px-6 pt-5 pb-10 w-full justify-between items-center'>
        <div className='flex gap-2'>
          <img src='/x.svg' className='w-10' />
          <div className='flex flex-col text-white text-left justify-center text-xs sm:text-sm'>
            <p>Post a tweet about Buffy on X</p>
            <p>and receive extra rewards.</p>
          </div>
        </div>
        <div onClick={handleFollow} className='bg-white text-black rounded-full px-3 h-fit py-1 text-sm font-semibold hidden sm:block cursor-pointer'>
          Post on X
        </div>
        <div onClick={handleFollow} className='bg-white text-black rounded-full px-3 h-fit py-1 text-sm font-semibold block sm:hidden cursor-pointer'>
          Post
        </div>
      </div>
      <div className='relative rounded-2xl -top-5 w-full flex justify-between px-5 gap-2 items-center flex-col bg-black'>
        <div className='flex flex-col gap-4 justify-start w-full items-center'>
          {claim && <ClaimCard userId={user?.id} handleClose={() => setClaim(false)} />}
          <div className='mt-5'>
            <WalletConnect />
          </div>
          <p className="text-2xl text-[#acacac] font-semibold bg-gradient-to-t from-[#444444] to-[#bdbdbd] bg-clip-text text-transparent">You’re user {rank} to join the BuffyDrop!</p>
          <img src='/dogAvatar.png' className='w-1/3'></img>
          <div>
            <p className='text-[34px] font-semibold'>
              {!curUser ||
              formatNumberWithCommas(curUser?.totalPoints) == "NaN" ? (
                <div className='flex items-center justify-center w-full'>
                  <Loader width='30' />
                </div>
              ) : (
                <p>{formatNumberWithCommas(curUser?.totalPoints)}</p>
              )}
            </p>
            <p className='text-[20px] text-[#acacac]'>$BUFFY</p>
          </div>
          <div className='flex flex-row gap-2 w-full'>
            <Carousel
              className='carousel-card relative flex -left-[11%] overflow-visible'
              infiniteLoop={true}
              showArrows={false}
              showIndicators={true}
              showStatus={false}
              centerMode
              centerSlidePercentage={80}
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
          className='bg-[#110d33] w-full py-4 leading-none mt-4'
          onClick={() => setClaim(true)}>
          Claim hints
        </button>
      </div>
    </div>
  );
};
export default Exchange;
