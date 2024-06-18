export default function Boost() {
  return (
    <div className="Boost max-w-full mx-auto  h-[75vh] max-sm:h-[82vh] mt-8">
      <h1 className="text-3xl mb-3  max-w-[500px] mx-auto text-start  flex justify-center">
        Your Balance
      </h1>
      <div className="md:w-full h-[65vh] mx-auto flex flex-col justify-center ">
        <div className="max-h-[50vh] max-sm:max-h-[50vh]">
          <div className="flex px-3 py-1 gap-5 text-lg font-bold justify-center align-middle overflow-y-hidden">
            <img src="/image/dollar.png" alt="" className="w-10 h-10" />
            <h1 className="text-4xl">5145</h1>
          </div>
          <h2 className="text-xl mt-7">How a boost works</h2>
        </div>
        <hr className="my-3 border-1" />
        <div className="flex justify-start">
          <h1 className=" text-xl">Free daily boosters</h1>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center customCard rounded-[30px] hover:opacity-80 cursor-pointer`}
        >
          <img src="/image/icon/lightning.svg" alt="" className="w-10 h-10" />
          <div className="flex flex-col">
            <h3 className="text-2xl ">Full energy</h3>
            <h3 className="text-xl text-[#a8a8a7]">6/6 available</h3>
          </div>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center customCard rounded-[30px] gap-2 hover:opacity-80 cursor-pointer`}
        >
          <img src="/image/turbo.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col">
            <h3 className="text-2xl  text-left">Turbo</h3>
            <h3 className="text-xl text-[#a8a8a7]">Coming soon</h3>
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className=" text-xl">Boosters</h1>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center customCard rounded-[30px] gap-2 hover:opacity-80 cursor-pointer`}
        >
          <img src="/image/double-tap.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl  text-left">Multitap</h3>
            <div className="flex gap-3 align-middle">
              <img src="/image/dollar.png" alt="" className="w-5 h-5" />
              <h3>2K * 2M</h3>
            </div>
          </div>
        </div>
        <div
          className={`flex my-3 px-5 py-3 items-center customCard rounded-[30px] gap-2 hover:opacity-80 cursor-pointer`}
        >
          <img src="/image/battery.png" alt="" className="w-10 h-10" />
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl  text-left">Energy limit</h3>
            <div className="flex gap-3 align-middle">
              <img src="/image/dollar.png" alt="" className="w-5 h-5" />
              <h3>2K * 2M</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
