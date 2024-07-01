const DailyCard = () => {
  return (
    <div className="customCard grid grid-col-1 grid-col-1 w-full">
      <div className="group rounded-lg p-2 sm:p-3 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex items-center">
          <span className="text-sm md:text-2xl text-white items-center">
            Daily Combo
          </span>
        </div>
        <div className="bg-white rounded-[10px] p-1 sm-p-2 flex space-x-4 items-center">
          <img src="/image/dollar.png" alt="" className="w-8 h-8" />
          <span className="text-sm md:text-xl text-[#2862e0]">+{5352342}</span>
          <img src="/image/check.png" alt="" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default DailyCard;
