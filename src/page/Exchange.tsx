import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINT } from '../data'
import { toast } from 'react-hot-toast'
import Setting from './Setting'
import Channel from '../component/Channel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import '../App.css'
import WalletConnect from '../component/WalletConnect'
import ClaimCard from '../component/ClaimCard'
import { formatNumberWithCommas } from '../utils/functions'
import Loader from '../component/Loader'

const ChannelData = [
  {
    id: 'Channel',
    title: 'DAILY TASK',
    comment: 'Lorem Ipsum',
    src: '/task_check.png',
    btnTitle: 'Go'
  },
  {
    id: 'INVITE',
    title: 'INVITE FRIENDS',
    comment: 'Lorem Ipsum',
    src: '/Invite_friend.png',
    btnTitle: 'Invite'
  },
  {
    id: 'Buffy',
    title: 'BUFFY COMMUNITY',
    comment: 'Lorem Ipsum',
    src: '/Invite_friends.png',
    btnTitle: 'Join'
  }
]

interface IHomeProps {
  user: any
  photo_url: string | null
  point: number
  totalPoint: number
  handleMining: () => void
  handleStopMining: () => void
  setTotalPoint: (value: number) => void
  setClaimShow: (status: boolean) => void
  start: boolean
  hour: number
  min: number
  sec: number
  claimShow: boolean
  timeLimit: any
  level: any
  nextLevel: any
  loading: boolean
  reachDailyLimit: boolean
  setReachDailyLimit: (status: boolean) => void
  setting: any
  exchange: any
  setExchange: (status: any) => void
  tab: string
  setTab: (status: string) => void
  title: string
  setTitle: (status: string) => void
}
const Exchange: React.FC<IHomeProps> = ({
  user,
  setting,
  exchange,
  setExchange,
  tab,
  setTab,
  title,
  setTitle
}) => {
  const [showSetting, setShowSetting] = useState<boolean>(false)
  const [claim, setClaim] = useState(false)
  const [curUser, setCurUser] = useState<any>({})
  const [rank, setRank] = useState(0);
  useEffect(() => {
    axios
      .get(`${ENDPOINT}/api/user/top/${user.id}?num=100`,{
        headers: {
          'ngrok-skip-browser-warning': 'true' // or any value you prefer
        }
      })
      .then(res => {
        let userInfo = res.data
        console.log("userInfo", userInfo)
        setCurUser(userInfo.curUser)
        setRank(userInfo.curUser.joinRank)
      })
      .catch(err => {
        console.error(err)
        toast.error('Something Went Wrong!')
      })
  }, [])
  return showSetting ? (
    <Setting
      user={user}
      setting={setting}
      setShowSetting={setShowSetting}
      exchange={exchange}
      setExchange={setExchange}
    />
  ) : (
    <div className='flex flex-col h-full justify-between items-center pt-[2.5rem] pb-[2rem] px-[20px] gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      {claim && <ClaimCard handleClose={() => setClaim(false)} />}
      <WalletConnect />
      <p>You’re user {rank} to join the BuffyDrop!</p>
      <img src='/dogAvatar.png' className='w-1/2'></img>
      <div>
        <p className="text-[34px]">
          {(!curUser || formatNumberWithCommas(curUser?.totalPoints) == 'NaN') ? (
            <div className="flex items-center justify-center w-full">
              <Loader width="30" />
            </div>
          ) : (
            <p>{formatNumberWithCommas(curUser?.totalPoints)}</p>
          )}
        </p>
        <p className='text-[20px]'>$BUFFY</p>
      </div>
      <div className='flex flex-row gap-2 w-full'>
        <Carousel
          className='w-full'
          infiniteLoop={false}
          showArrows={false}
          showIndicators={true}
          showStatus={false}
          showThumbs={false}
          useKeyboardArrows={false}
          autoPlay={false}
          stopOnHover={false}
          swipeable={true}
          dynamicHeight={false}
          emulateTouch={true}
          autoFocus={false}
        >
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
      <button
        className='bg-[#110d33] w-full h-[2.5rem] leading-none mt-1'
        onClick={() => setClaim(true)}
      >
        Claim hint
      </button>
    </div>
  )
}
export default Exchange
