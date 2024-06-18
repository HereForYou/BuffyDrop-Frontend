interface EarnCardProps {
  title: string;
  image: string;
  flag: boolean;
  profit: string;
}
const EarnCard: React.FC<EarnCardProps> = ({ title, image, flag, profit }) => {
  return (
    <div className="customCard grid grid-col-1 grid-col-1 w-full">
      <div className="group rounded-xl p-2 sm:p-3 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex grid-cols-2 gap-3 w-full">
          <div className="my-auto w-14">
            <img src={image} alt="" className="w-12 h-12" />
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="space-y-2">
              <p className=" text-lg font-semibold text-left">
                {title}
              </p>
              <div className="flex items-center">
                <img src="/image/dollar.png" alt="" className="w-6 h-6 ml-1" />
                <p className=" ml-1">+{profit}</p>
              </div>
            </div>
            <div className="flex items-center">
              {flag === true ? (
                <img src="/image/tick.png" alt="" className="w-8 h-8 ml-1" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCard;
