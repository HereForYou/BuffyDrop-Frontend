import React from 'react'
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
    <div className='flex flex-col justify-end h-full pt-4 bg-splash-back bg-cover'>
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
      {/* <div className='flex-col px-[20px] justify-between gap-[2rem] pt-0.5'>
        <div className='leading-none'>
          <p className='text-[32px]'>Buff Buff!</p>
          <p className='text-[20px] text-justify [text-align-last:justify]'>
            Claim your 100, 000 $Buffy
          </p>
        </div>
        <p className='text-[18px] text-justify [text-align-last:justify]'>
          You're our 100,000th member! Bring your friends onboard and unlock
          even more rewards from their success!
        </p>
        <button
          className='bg-blue-700 w-full h-[2.5rem] leading-none'
          onClick={() => setTab('Exchange')}
        >
          Claim Buffy
        </button>
      </div> */}

      {/* <div className='flex flex-col w-full gap-2 text-white'>
        <h1 className='lilita text-[16px] font-bold'>
          You are user #100, 000 to join the Buffy Drop!
        </h1>
        <h1 className='lilita text-[60px] font-bold'>BLEGGS</h1>
        <h1 className='lilita text-[40px] font-bold'>Miner System!</h1>
        <h2 className='text-[12px]'>
          Engage, Earn, and Grow with the Community
        </h2>
        <div className='customCard-container rounded-full'>
          <div
            onClick={() => setTab('Exchange')}
            className='customCard rounded-full hover:bg-inherit py-1 text-[#012335] font-bold'
          >
            <h2>Start Earning BLEGGS Today!</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <section className='flex flex-row w-full badge items-baseline justify-around'>
          <img
            src='badge 1.png'
            alt='badge'
            className='h-[60px] aspect-square'
          />
          <div className='relative h-[100px] aspect-auto'>
            <img
              src='badge 2.png'
              alt='badge'
              className='h-[100px] aspect-auto'
            />
            <div className='absolute flex items-center justify-center top-0 left-0 h-[100px] w-full text-center'>
              <h1 className='text-[14px] text-[#FFD798] font-bold'>
                {convertToShorthand(totalPoint)}
              </h1>
            </div>
          </div>
          <img
            src='badge 3.png'
            alt='badge'
            className='h-[60px] aspect-square'
          />
        </section>
        <section className='grid grid-cols-3 space-x-1'>
          <div>
            <h3 className='text-[16px] text-white py-2'>Referrals</h3>
            <div className='customCard-container p-[3px]'>
              <div className='customCard text-center cursor-default flex items-center justify-center h-[70px]'>
                <h3 className='text-[12px] font-bold'>
                  Successful
                  <br />
                  Referrals
                  <br />
                  {referral}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-[16px] text-white py-2'>Earning</h3>
            <div className='customCard-container p-[3px]'>
              <div className='customCard text-center flex cursor-default items-center justify-center h-[70px]'>
                <h3 className='text-[12px] font-bold'>
                  You Earned
                  <br />
                  {totalPoint.toFixed(2)} BLEGGS
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-[16px] text-white py-2'>Hash Power</h3>
            <div className='customCard-container p-[3px]'>
              <div className='customCard text-center flex cursor-default items-center justify-center h-[70px]'>
                <h3 className='text-[12px] font-bold'>{power?.value}/MHS</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
      <h6 className='lilita text-center text-[12px] font-bold bg-[#e6c12e] w-16 rounded-full text-white mt-1'>
        Beta V 1.0
      </h6> */}
    </div>
  )
}
export default Splash
