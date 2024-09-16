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
    <div className='pb-4 h-[190px] flex w-full'>
      <div className='bg-[#4b37dd]  rounded-[1rem] w-[93%] min-w-[18rem] flex flex-col py-5 px-5 justify-start h-fit'>
        <div className='flex flex-col justify-between gap-1'>
          <p className='text-[20px] text-left leading-none font-bold'>{heading}</p>
          <p className='text-[12px] text-left'>{comment}</p>
        </div>
        <div className='flex flex-row justify-between pt-2 items-center'>
          <div>
            <button
              className='bg-white rounded-3xl text-[#4b37dd] w-20 h-6 p-2 flex justify-center items-center'
              onClick={() => handleClick(id, heading)}
            >
              {btnTitle}
            </button>
          </div>
          <div className='flex h-10 w-12'>
            <img src={src}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel
