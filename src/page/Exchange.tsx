import React, { useEffect, useState } from 'react'
// import ProgressBar from '../component/ProgressBar'
// import Loader from '../component/Loader'
import axios from 'axios'
import { ENDPOINT } from '../data'
import { toast } from 'react-hot-toast'

// import ExchangeSelector from '../component/exchangeSelector'
// import io from 'socket.io-client'
// import { slicFunc } from '../utils/functions'
import Setting from './Setting'
import Channel from '../component/Channel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import '../App.css'
import WalletConnect from '../component/WalletConnect'
import ClaimCard from '../component/ClaimCard'
import { formatNumberWithCommas } from '../utils/functions'

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

// const socket = io(ENDPOINT) // Replace with your server's URL

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
  power: any
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
  // photo_url,
  // point,
  // totalPoint,
  // handleMining,
  // handleStopMining,
  // claimShow,
  // reachDailyLimit,
  // setReachDailyLimit,
  // setTotalPoint,
  // setClaimShow,
  // start,
  // hour,
  // min,
  // sec,
  // timeLimit,
  // power,
  // level,
  // nextLevel,
  // loading,
  setting,
  exchange,
  setExchange,
  tab,
  setTab,
  title,
  setTitle
}) => {
  // const [totalUsers, setTotalUsers] = useState<number>(0)
  const [showSetting, setShowSetting] = useState<boolean>(false)
  const [claim, setClaim] = useState(false)
  const [curUser, setCurUser] = useState<any>({})

  // const handleClaim = () => {
  //   if (user) {
  //     axios
  //       .put(`${ENDPOINT}/api/user/${user?.id}`, {
  //         points: point,
  //         countDown: 0
  //       })
  //       .then(res => {
  //         console.log('res', res.data)
  //         let newpoint = point + totalPoint
  //         setTotalPoint(newpoint)
  //         setClaimShow(false)
  //         setReachDailyLimit(true)
  //       })
  //       .catch(err => {
  //         console.error(err)
  //         // toast("Something Went Wrong!");
  //       })
  //   }
  // }

  // useEffect(() => {
  //   axios
  //     .get(`${ENDPOINT}/api/user/totalcount`)
  //     .then(res => {
  //       setTotalUsers(res.data.totalCount)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       // toast("Something Went Wrong!");
  //     })
  //   socket.on('newUserRegistered', data => {
  //     setTotalUsers(data.totalCount)
  //   })

  //   return () => {
  //     socket.off('newUserRegistered') // Remove the listener to prevent memory leaks
  //   }
  // }, [])
  useEffect(() => {
    // if (!hasShownWarningRef.current && user) {
    // setLoading(true)
    // axios.get(`${ENDPOINT}/api/user/all/${user.id}`)
    axios
      .get(`${ENDPOINT}/api/user/top/${user.id}?num=100`,{
        headers: {
          'ngrok-skip-browser-warning': 'true' // or any value you prefer
        }
      })
      .then(res => {
        let userInfo = res.data

        // setUsers(userInfo.topUsers)
        setCurUser(userInfo.curUser)
        // setRaking(userInfo.ranking)
        // setLoading(false)
      })
      .catch(err => {
        console.error(err)
        toast.error('Something Went Wrong!')
      })
    // hasShownWarningRef.current = true
    // }
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
    <div className='flex flex-col h-full justify-between pt-[2.5rem] pb-[2rem] px-[20px] gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      {claim && <ClaimCard handleClose={() => setClaim(false)} />}
      <WalletConnect />
      <p>You’re user #100,000 to join the BuffyDrop!</p>
      <img src='/coat.png' className='mx-[56px] h-48'></img>
      <div>
        <p className='text-[34px]'>
          {formatNumberWithCommas(curUser?.totalPoints)}
          {/* 1234 */}
        </p>
        <p className='text-[20px]'>$BUFFY</p>
      </div>
      {/* <TonConnectButton /> */}
      {/* className="absolute bg-[#110d33] text-[#acacac] p-2" */}
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
