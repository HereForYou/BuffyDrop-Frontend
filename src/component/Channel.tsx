import React from 'react'
interface ChannelProps {
  title: string
  comment: String
  src: any
}
const Channel: React.FC<ChannelProps> = ({ title, comment }) => {
  return (
    <div className='bg-[#4b37dd] rounded-[1rem] w-[80%] min-w-[18rem] flex flex-col py-2 px-[20px] justify-between'>
      <div className='flex flex-col justify-between'>
        <p className='text-[20px] text-left leading-none'>{title}</p>
        <p className='text-[16px] text-left'>{comment}</p>
      </div>

      <div className='flex flex-row w-full h-12 justify-between align-baseline py-2'>
        <button className='bg-white rounded-3xl text-[#4b37dd] w-[100px] h-8 p-0'>
          Join
        </button>
        <img src='/Invite_friend.png'></img>
      </div>
    </div>
  )
}

export default Channel
