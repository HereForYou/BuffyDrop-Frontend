interface InviteCardProps {
  setShowModal: (status: boolean) => void;
  title: string;
  profit: number;
}
const InviteCard: React.FC<InviteCardProps> = ({ setShowModal, title, profit }) => {
  return (
    <div onClick={() => setShowModal(true)} className="customCard-container grid grid-col-1 grid-col-1 w-full">
      <div className="customCard flex justify-start px-1 gap-2 group transition relative duration-300 cursor-pointer hover:bg-inherit hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
        <img
          src="gift.svg"
          alt=""
          className="w-10 h-10"
        />
        <div className=" space-y-1">
          <h2 className="text-[16px] text-left font-bold">
            {title}
          </h2>
          <div className="flex items-center justify-center">
            <img
              src="dollar.png"
              alt=""
              className="w-4 h-4"
            />
            <h3 className="text-[12px] font-bold">&nbsp;+{profit}<span>&nbsp;for you and your friend</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
