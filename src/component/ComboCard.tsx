interface ComboCardProps {
  image: string;
  content: string;
}
const ComboCard: React.FC<ComboCardProps> = ({ image, content }) => {
  return (
    <div className="customCard group w-full rounded-lg bg-gradient-to-b from-pink-50 to-indigo-600 pt-[1px] px-[1px]">
      <div className="group w-full rounded-lg transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] py-2 px-[2px] h-[100px] sm:h-[150px]">
        <div className="flex flex-row justify-center align-middle pt-2">
          <img
            src={image}
            alt="iamge"
            className="w-[70px] h-[70px] max-sm:w-10 max-sm:h-10"
          />
        </div>
        <p className="text-[12px] sm:text-sm md:text-lg  pt-2 sm:pt-4">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ComboCard;
