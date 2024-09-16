
interface FriendCardProps {
  name: string;
  value: number;
}
const FriendCard: React.FC<FriendCardProps> = ({ name, value }) => {
  return (
    <div className='flex flex-row items-center justify-between w-full px-6 text-white my-2'>
      <div className='flex justify-center items-center'>
        <div className="bg-white h-7 min-w-7 w-7 flex justify-center items-center rounded-full">
          <img src='friend.svg' alt='' className='flex invertSVG scale-75 w-6' />
        </div>
        {/* <div className='h-8 w-8 rounded-full bg-white text-center flex justify-center items-center '>
          {name.substring(0, 2).toUpperCase()}
        </div> */}
        <div className='text-sm px-4 w-full'>{name}</div>
      </div>
      <div className='text-xs'>{"+" + value.toFixed(2) + " BUFFYS"}</div>
    </div>
  );
};

export default FriendCard;
