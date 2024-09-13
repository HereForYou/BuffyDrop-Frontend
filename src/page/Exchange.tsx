import React, { useEffect, useState } from 'react'
import ProgressBar from '../component/ProgressBar'
import Loader from '../component/Loader'
import axios from 'axios'
import { ENDPOINT } from '../data'
import ExchangeSelector from '../component/exchangeSelector'
import io from 'socket.io-client'
import { slicFunc } from '../utils/functions'
import Setting from './Setting'
import Channel from '../component/Channel'
import { Carousel } from 'flowbite-react'
const ChannelData = [
  {
    title: 'DAILY TASK',
    comment: 'Lorem Ipsum',
    src: '/task_check.png'
  },
  {
    title: 'INVITE FRIENDS',
    comment: 'Lorem Ipsum',
    src: '/Invite_friend.png'
  },
  {
    title: 'BUFFY COMMUNITY',
    comment: 'Lorem Ipsum',
    src: '/Invite_friends.png'
  }
]

const socket = io(ENDPOINT) // Replace with your server's URL

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
}
const Exchange: React.FC<IHomeProps> = ({
  user,
  photo_url,
  point,
  totalPoint,
  handleMining,
  handleStopMining,
  claimShow,
  reachDailyLimit,
  setReachDailyLimit,
  setTotalPoint,
  setClaimShow,
  start,
  hour,
  min,
  sec,
  timeLimit,
  power,
  level,
  nextLevel,
  loading,
  setting,
  exchange,
  setExchange
}) => {
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [showSetting, setShowSetting] = useState<boolean>(false)

  const handleClaim = () => {
    if (user) {
      axios
        .put(`${ENDPOINT}/api/user/${user?.id}`, {
          points: point,
          countDown: 0
        })
        .then(res => {
          console.log('res', res.data)
          let newpoint = point + totalPoint
          setTotalPoint(newpoint)
          setClaimShow(false)
          setReachDailyLimit(true)
        })
        .catch(err => {
          console.error(err)
          // toast("Something Went Wrong!");
        })
    }
  }

  useEffect(() => {
    axios
      .get(`${ENDPOINT}/api/user/totalcount`)
      .then(res => {
        setTotalUsers(res.data.totalCount)
      })
      .catch(err => {
        console.error(err)
        // toast("Something Went Wrong!");
      })
    socket.on('newUserRegistered', data => {
      setTotalUsers(data.totalCount)
    })

    return () => {
      socket.off('newUserRegistered') // Remove the listener to prevent memory leaks
    }
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
    <div className='flex flex-col h-full justify-between pt-[2.5rem] pb-[1rem] px-[20px] gap-2'>
      <p>You’re user #100,000 to join the BuffyDrop!</p>
      <img src='/coat.png' className='mx-[40px] h-60'></img>
      <div>
        <p className='text-[34px]'>16, 588</p>
        <p className='text-[20px]'>$BUFFY</p>
      </div>
      <div className='flex flex-row gap-2 overflow-auto w-full '>
        {/* <Carousel indicators={true}> */}
        {ChannelData.map((idx, key) => (
          <Channel
            title={idx.title}
            comment={idx.comment}
            src={idx.src}
            key={key}
          />
        ))}
        {/* <Channel title='BUFFY COMMUNITY' comment={'Lepurm'} src='src' />
        <Channel title='BUFFY COMMUNITY' comment={'Lepurm'} src='src' />
        <Channel title='BUFFY COMMUNITY' comment={'Lepurm'} src='src' /> */}
        {/* </Carousel> */}
      </div>

      <button className='bg-[#4b37dd] w-full h-[2.5rem] leading-none mt-4'>
        Claim hint
      </button>
    </div>
    // <div className="h-full flex flex-col text-center items-center justify-between py-2">
    //   {
    //     start ? (
    //       <div className="flex flex-col w-full">
    //         <div className="flex flex-row w-full justify-between items-baseline">
    //           <img src="logo.png" alt="logo" className="h-[60px]" />
    //           {
    //             loading ? (
    //               <Loader width="15" />
    //             ) : (
    //               <h1 className="font-bold text-[22px] text-white">
    //                 {totalPoint.toFixed(2)}&nbsp;$BLEGGS
    //               </h1>
    //             )
    //           }
    //         </div>
    //         <div className="customCard w-full py-[2px]"></div>
    //       </div>
    //     ) : (
    //       <>
    //         <div className="w-full">
    //           <div className="flex flex-row items-center w-full justify-between py-1">
    //             <div className="customCard-container flex flex-row text-[14px] font-bold items-center gap-1 rounded-full border border-[#D18729] p-1">
    //               <img src={photo_url || 'user.svg'} className={`rounded-full overflow-hidden w-6 h-6`} />
    //               <h4>{slicFunc(user?.username + user?.last_name)}</h4>
    //             </div>
    //             <ExchangeSelector exchange={exchange} setShowSetting={setShowSetting} />
    //           </div>

    //           {/* <div className="customCard group py-4 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]">
    //                 <h2 className="text-[24px] font-extrabold">$BLEGGS Miner</h2>
    //               </div > */}
    //         </div >
    //         <div className="flex flex-col items-center justify-center w-full gap-2">
    //           <img className="logo h-[60px] w-[60px] rounded-full" src="dollar.png" alt="logo" />
    //           <div className="flex flex-col balance gap-2 w-full">
    //             {
    //               loading ? (
    //                 <Loader width="15" />
    //               ) : (
    //                 <h1 className="font-bold text-[24px] text-white">
    //                   {totalPoint.toFixed(2)}$BLEGGS
    //                 </h1>
    //               )
    //             }
    //             <div className="flex flex-row w-full justify-between items-center text-white">
    //               {
    //                 loading ? (
    //                   <Loader width="15" />
    //                 ) : (
    //                   <h3 className="text-[13px] font-bold">Level{level.level}</h3>
    //                 )
    //               }
    //               {
    //                 loading ? (
    //                   <Loader width="15" />
    //                 ) : (
    //                   <h3 className="text-[13px] font-bold">Level{nextLevel.level}</h3>
    //                 )
    //               }
    //             </div>
    //             <ProgressBar value={(totalPoint - level.coinsToLevelUp) / (nextLevel.coinsToLevelUp - level.coinsToLevelUp) * 100} />
    //           </div>
    //         </div>
    //       </>
    //     )
    //   }
    //   {
    //     !start ? (
    //       claimShow ? (
    //         <div className="bg-white p-[10px] rounded-full">
    //           <button onClick={handleClaim} className="customBtn startBt aspect-square rounded-full py-2 px-4">
    //             <h2 className="text-[30px] font-bold">CLAIM</h2>
    //           </button>
    //         </div>
    //       ) : (
    //         reachDailyLimit ? (
    //           <h2 className="text-[16px] text-white" > You reached out the timeLimit</h2>
    //         ) : (
    //           <div className="bg-white p-[10px] rounded-full">
    //             <button onClick={handleMining} className="customBtn startBt aspect-square rounded-full py-2 px-4">
    //               <h2 className="text-[30px] font-bold">START<br />MINING</h2>
    //             </button>
    //           </div>
    //         )
    //       )
    //     ) : (
    //       <>
    //         <div className="bg-white p-[10px] rounded-full">
    //           <button onClick={handleStopMining} className="customBtn stopBtn aspect-square rounded-full py-2 px-4">
    //             <h2 className="text-[30px] font-bold">STOP<br /> MINING</h2>
    //           </button>
    //         </div>
    //         <div className="flex flex-col gap-2 w-full">
    //           <div className="customCard-container font-bold">
    //             <div className="customCard flex flex-row w-full  justify-between items-center">
    //               <h2 className="earning text-[24px]">{point.toFixed(3)}</h2>
    //               <section className="flex flex-row gap-4">
    //                 {loading ? (
    //                   <>
    //                     <div className="flex flex-col text-center">
    //                       <Loader width="15" />
    //                       <h4 className="text-[12px]">Hours</h4>
    //                     </div>
    //                     <div className="flex flex-col text-center">
    //                       <Loader width="15" />
    //                       <h4 className="text-[12px]">Mins</h4>
    //                     </div>
    //                     <div className="flex flex-col text-center">
    //                       <Loader width="15" />
    //                       <h4 className="text-[12px]">Secs</h4>
    //                     </div>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <div className="flex flex-col text-center">
    //                       <h3 className="text-[16px]">{hour}</h3>
    //                       <h4 className="text-[12px]">Hours</h4>
    //                     </div>
    //                     <div className="flex flex-col text-center">
    //                       <h3 className="text-[16px]">{min}</h3>
    //                       <h4 className="text-[12px]">Mins</h4>
    //                     </div>
    //                     <div className="flex flex-col text-center">
    //                       <h3 className="text-[16px]">{sec}</h3>
    //                       <h4 className="text-[12px]">Secs</h4>
    //                     </div>
    //                   </>
    //                 )}
    //               </section>
    //             </div >
    //           </div>
    //         </div>
    //       </>
    //     )
    //   }
    //   <div className="flex flex-row items-center justify-between w-full text-[20px] text-white lilita">
    //     <div className="flex flex-row gap-1 items-center">
    //       <img src="boost.png" alt="boost" className="h-[30px] aspect-square" />
    //       {
    //         loading ? (
    //           <Loader width="20" />
    //         ) : (
    //           <h3 className="text-[18px]">{power.value} <span className="text-[16px]">MH</span> /&nbsp;<span>{timeLimit.value} <span className="text-[16px]">Min</span></span></h3>
    //         )
    //       }
    //     </div>
    //     <h4 className="text-white text-[14px]">Active Workers = <span className="text-[16px] font-bold">{totalUsers}</span></h4>
    //   </div>
    // </div >
  )
}
export default Exchange
