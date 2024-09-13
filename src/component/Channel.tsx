import React from 'react'
interface ChannelProps {
  id: string
  heading: string
  comment: String
  src: any
  tab: string
  setTab: (status: string) => void
  title: string
  setTitle: (status: string) => void
}
const Channel: React.FC<ChannelProps> = ({
  heading,
  comment,
  src,
  // tab,
  id,
  setTab,
  // title,
  setTitle
}) => {
  const handleClick = (tab: string, title: string) => {
    setTab(tab)
    setTitle(title)
  }
  return (
    <div className='bg-[#4b37dd] rounded-[1rem] w-full min-w-[18rem] flex flex-col pt-4 py-2 px-[20px] justify-between'>
      <div className='flex flex-col justify-between'>
        <p className='text-[20px] text-left leading-none'>{heading}</p>
        <p className='text-[12px] text-left'>{comment}</p>
      </div>

      <div className='flex flex-row w-full h-12 justify-between align-baseline py-1'>
        <button
          className='bg-white rounded-3xl text-[#4b37dd] w-[70px] h-6 p-0'
          onClick={() => handleClick(id, heading)}
        >
          Join
        </button>
        <img src={src} className='w-10 h-10'></img>
      </div>
    </div>
  )
}

export default Channel
