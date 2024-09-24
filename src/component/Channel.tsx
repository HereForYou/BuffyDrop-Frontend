import React from 'react'
interface ChannelProps {
  id: string
  heading: string
  comment: String
  src: any
  setTab: (status: string) => void
  setTitle: (status: string) => void
  btnTitle:string
}
const Channel: React.FC<ChannelProps> = ({
  heading,
  comment,
  src,
  id,
  setTab,
  setTitle,
  btnTitle
}) => {
  const handleClick = (tab: string, title: string) => {
    setTab(tab)
    setTitle(title)
  }
  return (
    <div className='h-[190px] flex-1 flex w-full'>
      <div className='bg-[#4b37dd]  rounded-[1rem] flex flex-col py-5 px-5 gap-1 justify-start h-[150px] xs:h-[130px] w-[93%]'>
        <div className='flex flex-col justify-between gap-1 h-[60px]'>
          <p className='text-xl text-left leading-none font-bold'>{heading}</p>
          <p className='text-xs text-left clam'>{comment}</p>
        </div>
        <div className='flex flex-row justify-between pt-2 xxxs:pt-1 items-center'>
          <div>
            <button
              className='bg-white rounded-3xl text-[#4b37dd] w-20 h-6 p-2 flex justify-center items-center'
              onClick={() => handleClick(id, heading)}
            >
              {btnTitle}
            </button>
          </div>
          <div className='flex h-10 xxs:w-12 w-8'>
            {src}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channel
