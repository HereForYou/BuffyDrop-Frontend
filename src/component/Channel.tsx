import React from 'react'
interface ChannelProps {
  id: string
  title: string
  comment: String
  src: any
  tab: string
  setTab: (status: string) => void
}
const Channel: React.FC<ChannelProps> = ({
  title,
  comment,
  src,
  tab,
  id,
  setTab
}) => {
  const handleClick = (tab: string) => {
    setTab(tab)
  }
  return (
    <div className='bg-[#4b37dd] rounded-[1rem] w-full min-w-[18rem] flex flex-col py-2 px-[20px] justify-between'>
      <div className='flex flex-col justify-between'>
        <p className='text-[20px] text-left leading-none'>{title}</p>
        <p className='text-[16px] text-left'>{comment}</p>
      </div>

      <div className='flex flex-row w-full h-12 justify-between align-baseline py-2'>
        <button
          className='bg-white rounded-3xl text-[#4b37dd] w-[100px] h-8 p-0'
          onClick={() => handleClick(id)}
        >
          Join
        </button>
        <img src={src} className='w-10 h-10'></img>
      </div>
    </div>
  )
}

export default Channel
