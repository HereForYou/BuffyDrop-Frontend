interface EarnCardProps {
  title: string;
  image: string;
  flag: boolean;
  profit: number;
}
const EarnCard: React.FC<EarnCardProps> = ({ title, image, flag, profit }) => {
  return (
    <div className="customCard-container grid grid-col-1 grid-col-1 w-full">
      <div className="customCard group p-2 transition relative duration-300 cursor-pointer hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
        <div className="flex grid-cols-2 gap-3 w-full">
          <div className="my-auto w-14">
            <img src={image} alt="icon" className="w-8 aspect-square" />
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="space-y-2">
              <p className="text-[16px] font-semibold text-left">
                {title}
              </p>
              <div className="flex items-center">
                <img src="dollar.png" alt="" className="w-6 h-6 ml-1" />
                <p className="text-[13px] ml-1 font-bold">+{profit}</p>
              </div>
            </div>
            <div className="flex items-center">
              {flag === true ? (
                <img src="check.svg" alt="" className="w-6 h-6 ml-1" />
              ) : (
                <img src="uncheck.svg" alt="" className="w-6 h-6 ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCard;
