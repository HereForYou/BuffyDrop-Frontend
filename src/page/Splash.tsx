import React from 'react';

interface ISplashProps {
  level: any;
  power: any;
  totalPoint: number;
  referral: number;
  setTab: (tab: string) => void;
}

const Splash: React.FC<ISplashProps> = ({ level, power, totalPoint, referral, setTab }) => {

  return (
    <div className="flex flex-col justify-between h-full">
      {/* <a href='https://app.bleggs.com' target='blank' className="flex flex-row-reverse items-end w-full py-2 cursor-pointer">
        <img src="setting.svg" alt="setting" className="h-[30px]" />
      </a> */}
      <div className="flex flex-col w-full gap-2 text-white">
        <h1 className="lilita text-[40px] font-bold">
          Welcome to the
        </h1>
        <h1 className="lilita text-[60px] font-bold">
          BLEGGS
        </h1>
        <h1 className="lilita text-[40px] font-bold">
          Airdrop System!
        </h1>
        <h2 className="text-[13px]">Engage, Earn, and Grow with the Community</h2>
        <div className="customCard-container rounded-full">
          <div onClick={() => setTab('Exchange')} className="customCard rounded-full hover:bg-inherit py-1 text-[#012335] font-bold">
            <h2>Start Earning BLEGGS Today!</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <section className="flex flex-row w-full badge items-baseline justify-around">
          <img src="badge 1.png" alt="badge" className="h-[60px] aspect-square" />
          <div className='relative h-[100px] aspect-auto'>
            <img src="badge 2.png" alt="badge" className="h-[100px] aspect-auto" />
            <div className='absolute flex items-center justify-center top-0 left-0 h-[100px] w-full text-center'>
              <h1 className='text-[32px] text-[#FFD798] font-bold'>{level.level}</h1>
            </div>
          </div>
          <img src="badge 3.png" alt="badge" className="h-[60px] aspect-square" />
        </section>
        <section className="grid grid-cols-3 space-x-1">
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center cursor-default flex items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  Successful<br />Referrals<br />{referral}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center flex cursor-default items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  You Earned<br />{totalPoint} BLEGGS
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center flex cursor-default items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  {power?.value}/MHS
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Splash;
