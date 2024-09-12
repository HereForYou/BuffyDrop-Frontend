import React from 'react'
interface ChannelProps {
  title: string
}
const Channel: React.FC<ChannelProps> = () => {
  return (
    <div className='bg-blue-700 rounded-[1rem] flex flex-col gap-1 justify-between items-center p-2'>
      <p className='text-[32px]'>BUFFY COMMUNITY</p>
      <p className='text-[18px]'>Join Buffy community channel</p>
      <button className='bg-white rounded-3xl text-blue-700 w-[140px]'>
        Join
      </button>
    </div>
  )
}

export default Channel
