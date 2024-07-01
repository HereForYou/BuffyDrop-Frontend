const Splash = ({ setTab }: { setTab: (tab: string) => void }) => {
  return (
    <div className="flex flex-col justify-between h-full pb-[20px]">
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
          <div onClick={() => setTab('Exchange')} className="customCard rounded-full py-1 text-[#012335] font-bold">
            <h2>Start Earning BLEGGS Today!</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <section className="flex flex-row w-full badge items-baseline justify-around">
          <img src="badge 1.png" alt="badge" className="h-[60px] aspect-square" />
          <img src="badge 2.png" alt="badge" className="h-[100px] aspect-auto" />
          <img src="badge 3.png" alt="badge" className="h-[60px] aspect-square" />
        </section>
        <section className="grid grid-cols-3 space-x-1">
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center flex items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  Successful<br />Referrals<br />25
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center flex items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  You Earned<br />500K BLEGGS
                </h3>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[16px] text-white py-2">Referrals</h3>
            <div className="customCard-container p-[3px]">
              <div className="customCard text-center flex items-center justify-center h-[70px]">
                <h3 className="text-[12px] font-bold">
                  10/MHS
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
