import React from 'react'
import Confetti from "react-confetti";
// import { convertToShorthand } from '../utils/functions'

interface ISplashProps {
  power: any
  totalPoint: number
  referral: number
  setTab: (tab: string) => void
}

const Splash: React.FC<ISplashProps> = ({
  // power,
  // totalPoint,
  // referral,
  setTab
}) => {
  return (
    <div className='flex flex-col justify-end h-full pt-4 bg-splash-back bg-cover bg-center'>
      <div className='flex flex-col px-[20px] justify-between pt-0.5 gap-2'>
        <div className='leading-none flex flex-col gap-1'>
          <p className='text-[32px] font-bold'>Buff Buff!</p>
          <p className='text-[26px] font-bold text-nowrap text-justify [text-align-last:justify]'>
            Claim your 100,000 $Buffy
          </p>
        </div>
        <p className='text-[18px] text-justify [text-align-last:justify]'>
          You're our 100,000th member! Bring your friends onboard and unlock
          even more rewards from their success!
        </p>
        <button
          className='bg-[#4b37dd] w-full h-[2.5rem] leading-none'
          onClick={() => setTab('Exchange')}
        >
          Claim Buffy
        </button>
      </div>
      <Confetti/>
    </div>
  )
}
export default Splash
