import React from "react";
import Confetti from "react-confetti";
// import { convertToShorthand } from '../utils/functions'

interface ISplashProps {
  ranking: any;
  setTab: (tab: string) => void;
}

const Splash: React.FC<ISplashProps> = ({
  ranking,
  setTab,
}) => {

  return window.innerHeight > 768 ? (
    <div className='flex flex-col justify-between h-full w-full pt-4 bg-cover bg-center'>
      <div className='flex flex-col items-center justify-center h-fit'>
        <img src='homeImg2.webp' className='top-10 w-full' loading='lazy' />
        <img
          src='homeImg.webp'
          className='w-32 relative top-10'
          loading='lazy'
        />
      </div>
      <div className='flex flex-col px-5 justify-between pt-0.5 gap-16 text-center'>
        <div className='flex flex-col gap-10'>
          <div className='leading-none flex flex-col gap-1 text-center'>
            <p className='text-[48px] font-bold'>Buff Buff!</p>
            <p className='text-[30px] font-bold text-nowrap text-center'>
              Claim your {ranking} $Buffy
            </p>
          </div>
          <p className='text-lg text-center'>
            You're our {ranking}th member! Bring your friends onboard and unlock
            even more rewards from their success!
          </p>
        </div>
        <button
          className='bg-[#4b37dd] w-full h-[2.5rem] leading-none'
          onClick={() => setTab("Exchange")}>
          Claim Buffy
        </button>
      </div>
      <Confetti />
    </div>
  ) : (
    <div className='flex flex-col justify-between h-full w-full pt-4 bg-cover bg-center'>
      <div className='flex flex-col items-center w-full justify-center'>
        <img src='homeImg2.webp' className='top-10 w-full' loading='lazy' />
        <img src='homeImg.webp' className='w-28 relative top-4' loading='lazy' />
      </div>
      <div className='flex flex-col px-5 justify-between pt-0.5 gap-3 text-center'>
        <div className='flex flex-col gap-1'>
          <div className='leading-none flex flex-col gap-1 text-center'>
            <p className='text-[32px] font-bold'>Buff Buff!</p>
            <p className='text-[28px] font-bold text-nowrap text-center'>
              Claim your {ranking} $Buffy
            </p>
          </div>
          <p className='text-lg text-center'>
            You're our {ranking}th member! Bring your friends onboard and unlock
            even more rewards from their success!
          </p>
        </div>
        <button
          className='bg-[#4b37dd] w-full h-[2.5rem] leading-none'
          onClick={() => setTab("Exchange")}>
          Claim Buffy
        </button>
      </div>
      <Confetti />
    </div>
  );
};
export default Splash;
