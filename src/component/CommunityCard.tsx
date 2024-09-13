import { formatNumberWithCommas } from '../utils/functions'

interface CommunityCardProps {
  // setShowModal: (status: boolean) => void;
  link: any
  avatar: any
  title: string
  buffy: number
  status: boolean
}
const CommunityCard: React.FC<CommunityCardProps> = ({
  link,
  avatar,
  title,
  buffy,
  status
}) => {
  return (
    <>
      <div className='px-6 my-2'>
        <a
          href={link}
          className={`flex flex-row justify-between items-center rounded-lg px-3 py-2 text-xs ${
            status ? 'bg-[#4b37dd]' : 'bg-[#110d33]'
          }`}
        >
          <div className='flex flex-row items-center text-[#acacac]'>
            <img src={avatar} alt='' className='w-88 h-8' />
            <div className='flex flex-col pl-2'>
              <div>{title}</div>
              <div className='flex flex-row items-center'>
                <img src='buffy_icon.png' alt='' className='w-4 h-4' />
                <div className='pl-1'>+{formatNumberWithCommas(buffy)}</div>
              </div>
            </div>
          </div>
          <div className='w-[10%] flex justify-center'>
            {status ? (
              <img src='/check_green.png' className='w-6 h-6' />
            ) : (
              <img src='/next_icon.png' className='w-2 h-3' />
            )}
          </div>
        </a>
      </div>
    </>
  )
}

export default CommunityCard
