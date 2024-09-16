import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { ENDPOINT } from '../data'
import { formatNumberWithCommas } from '../utils/functions'

interface ITaskProps {
  user: any
  totalPoint: number
  setTotalPoint: (status: number) => void
  task: string[]
  setTask: (status: string[]) => void
  setting: any
  title: string
}

const Task: React.FC<ITaskProps> = ({
  user,
  totalPoint,
  setTotalPoint,
  task,
  setTask,
  setting,
  title
}) => {
  console.log(title)
  const handleFollow = (link: any, id: any, profit: any) => {
    if (id == 'dailyTask') {
      axios
        .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
          id,
          profit
        })
        .then(res => {
          if (res.data) {
            let newPoints = totalPoint + profit
            setTotalPoint(newPoints)
            setTask([...task, id])
            toast.success(`+${profit} $BLEGGS!`)
          }
        })
        .catch(err => {
          console.error('er', err)
        })
    } else if (id == 'telegram' || id == 'website') {
      axios
        .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
          id,
          profit
        })
        .then(res => {
          if (res.data) {
            let newPoints = totalPoint + profit
            setTotalPoint(newPoints)
            setTask([...task, id])
            toast.success(`+${profit} $BLEGGS!`)
          }
        })
        .catch(err => {
          console.error('er', err)
        })
      window.open(link, '_blank')
    } else {
      window.open(link, '_blank')
      setTimeout(() => {
        axios
          .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
            id,
            profit
          })
          .then(res => {
            if (res.data) {
              let newPoints = totalPoint + profit
              setTotalPoint(newPoints)
              setTask([...task, id])
              toast.success(`+${profit} $BLEGGS!`)
            }
          })
          .catch(err => {
            console.error('er', err)
          })
      }, 300)
    }
  }
  const handleVisit = (link: any) => {
    window.open(link, '_blank')
  }
  return (
    <div className='w-full overflow-x-hidden overflow-y-auto hiddenScrollBar'>
      <div className='flex flex-col justify-center items-center text-xl text-[#acacac] font-bold pt-16 pb-6'>
        <img src='/buffy_community_img.png' alt='' className='min-w-24 w-[15vw] pb-4' />
        <div className='text-3xl text-white'>{title}</div>
      </div>
      <div className='px-6'>
        {setting?.taskList.map((item: any) =>
          task.includes(item.id) ? (
            <div
              onClick={() => handleVisit(item.link)}
              key={item.id}
              className='flex flex-row justify-between items-center rounded-lg px-3 py-2 cursor-pointer my-2 text-sm bg-[#4b37dd]'
            >
              <div className='flex flex-row gap-1 items-center text-[#acacac]'>
                <img
                  src={`${item.image ? item.image : 'choose.svg'}`}
                  alt='icon'
                  className='w-10 h-10'
                />
                <div className='flex flex-col pl-2 gap-[2px]'>
                  <div>{item.title}</div>
                  <div className='flex flex-row items-center'>
                    <img src='buffy_icon.png' alt='' className='w-4 h-4' />
                    <div className='pl-1'>
                      +{formatNumberWithCommas(item.profit)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[10%] flex justify-center'>
                <img src='/check_green.png' alt='' className='w-6 h-6' />
              </div>
            </div>
          ) : (
            <div
              onClick={() => handleFollow(item.link, item.id, item.profit)}
              key={item.id}
              className='flex flex-row justify-between items-center rounded-lg px-3 py-2 cursor-pointer my-2 text-sm bg-[#110d33]'
            >
              <div className='flex flex-row gap-1 items-center text-[#acacac]'>
                <img
                  src={`${item.image ? item.image : 'choose.svg'}`}
                  alt='icon'
                  className='w-10 aspect-square'
                />
                <div className='flex flex-col pl-2 gap-[2px]'>
                  <div className='flex flex-col'>{item.title}</div>
                  <div className='flex flex-row items-center'>
                    <img src='buffy_icon.png' alt='' className='w-4 h-4' />
                    <div className='pl-1'>
                      +{formatNumberWithCommas(item.profit)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[10%] flex justify-center'>
                <img src='/next_icon.png' alt='' className='w-2 h-3' />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
export default Task
