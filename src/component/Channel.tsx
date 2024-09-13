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
  btnTitle:string
}
const Channel: React.FC<ChannelProps> = ({
  heading,
  comment,
  src,
  // tab,
  id,
  setTab,
  // title,
  setTitle,
  btnTitle
}) => {
  const handleClick = (tab: string, title: string) => {
    setTab(tab)
    setTitle(title)
  }
  return (
    <div className='pb-4'>
      <div className='bg-[#4b37dd] rounded-[1rem] w-[90vw] min-w-[18rem] flex flex-col pt-4 py-2 px-[20px] justify-between'>
        <div className='flex flex-col justify-between'>
          <p className='text-[20px] text-left leading-none'>{heading}</p>
          <p className='text-[12px] text-left'>{comment}</p>
        </div>
        <div className='flex flex-row justify-between'>
          <div>
            <button
              className='bg-white rounded-3xl text-[#4b37dd] w-20 h-6 p-2 flex justify-center items-center'
              onClick={() => handleClick(id, heading)}
            >
              {btnTitle}
            </button>
          </div>
          <div>
            <img src={src} className='w-10 h-10'></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel
