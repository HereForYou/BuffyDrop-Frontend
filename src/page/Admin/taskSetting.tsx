import { useState, ChangeEvent } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {
  faPlus,
  faXmark,
  faPencil,
  faTrashCan,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ENDPOINT } from '../../data'

const TaskSetting = ({
  setting,
  setSetting
}: {
  setting: any
  setSetting: (value: any) => void
}) => {
  const [editRow, setEditRow] = useState<number>(-1)
  const [addMode, setAddMode] = useState<boolean>(false)
  const [dailyRevenueEdit, setDailyRevenueEdit] = useState<boolean>(false)
  const [inviteRevenueEdit, setInviteRevenueEdit] = useState<boolean>(false)

  const [settingItem, setSettingItem] = useState<any>({
    id: '',
    profit: 0,
    title: '',
    link: ''
  })

  const [dailyRevenue, setDailyRevenue] = useState<string>('')
  const [inviteRevenue, setInviteRevenue] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettingItem({
      ...settingItem,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = (index: number) => {
    let isSure = window.confirm('You really want to delete this one?')
    if (isSure) {
      axios
        .delete(`${ENDPOINT}/api/setting/delete/task/${index}`)
        .then(res => {
          setSetting(res.data)
          setEditRow(-1)
          toast.success('Updated successfully!')
        })
        .catch(err => {
          console.error('Something went wrong.', err)
        })
    }
  }

  const submitSetting = () => {
    let data = {
      id: settingItem.id,
      title: settingItem.title,
      profit: parseFloat(settingItem.profit),
      link: settingItem.link
    }
    axios
      .put(`${ENDPOINT}/api/setting/update/task/${editRow}`, data)
      .then(res => {
        setSetting(res.data)
        setEditRow(-1)
        toast.success('Updated successfully!')
      })
      .catch(err => {
        console.error('Something went wrong.', err)
      })
  }

  const handleDailyRevenueSave = () => {
    let data = {
      newRevenue: parseFloat(dailyRevenue)
    }
    axios
      .put(`${ENDPOINT}/api/setting/update/dailyRevenue`, data)
      .then(res => {
        setSetting(res.data)
        toast.success('Updated successfully!')
      })
      .catch(err => {
        console.error('Something went wrong.', err)
      })
  }
  const handleInviteRevenueSave = () => {
    let data = {
      newRevenue: parseFloat(inviteRevenue)
    }
    axios
      .put(`${ENDPOINT}/api/setting/update/inviteRevenue`, data)
      .then(res => {
        setSetting(res.data)
        toast.success('Updated successfully!')
      })
      .catch(err => {
        console.error('Something went wrong.', err)
      })
  }
  return (
    <>
      <div className='overflow-y-auto text-white py-[30px] w-full'>
        <div className='h-[70vh] w-full overflow-y-auto py-2'>
          <div className='flex flex-col md:flex-row w-full justify-around items-center md:py-8 gap-1'>
            <div className='flex flex-row justify-between items-center gap-8'>
              <h3 className='text-[15px]'>Daily Revenue:</h3>
              {!dailyRevenueEdit ? (
                <>
                  <h3 className='text-[15px]'>{setting.dailyRevenue} Buffy</h3>
                  <button
                    onClick={() => {
                      setDailyRevenueEdit(true)
                      setDailyRevenue(setting?.dailyRevenue)
                    }}
                    className='actionBtn'
                  >
                    <FontAwesomeIcon icon={faPencil} className='mr-1' />
                    {/* <h3 className="hidden md:flex">
                                                Edit
                                            </h3> */}
                  </button>
                </>
              ) : (
                <>
                  <input
                    type='text'
                    className='h-[30px] w-[60px]'
                    placeholder='Daily Revenue'
                    name='dailyRevenue'
                    value={dailyRevenue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDailyRevenue(e.target.value)
                    }
                  />
                  <div className='flex flex-row gap-2'>
                    <button
                      onClick={() => {
                        setDailyRevenueEdit(false)
                        handleDailyRevenueSave()
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faSave} className='mr-1' />
                      {/* <h3 className="hidden md:flex">
                                                    Save
                                                </h3> */}
                    </button>
                    <button
                      onClick={() => {
                        setDailyRevenueEdit(false)
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faXmark} className='mr-1' />
                      {/* <h3 className="hidden md:flex">
                                                    Cancel
                                                </h3> */}
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className='flex flex-row justify-between items-center gap-8'>
              <h3 className='text-[15px]'>Invite Revenue:</h3>
              {!inviteRevenueEdit ? (
                <>
                  <h3 className='text-[15px]'>{setting.inviteRevenue} Buffy</h3>
                  <button
                    onClick={() => {
                      setInviteRevenueEdit(true)
                      setInviteRevenue(setting?.inviteRevenue)
                    }}
                    className='actionBtn'
                  >
                    <FontAwesomeIcon icon={faPencil} className='mr-1' />
                    {/* <h3 className="hidden md:flex">
                                                Edit
                                            </h3> */}
                  </button>
                </>
              ) : (
                <>
                  <input
                    type='text'
                    className='h-[30px] w-[60px]'
                    placeholder='Invite Revenue'
                    name='inviteRevenue'
                    value={inviteRevenue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setInviteRevenue(e.target.value)
                    }
                  />
                  <div className='flex flex-row gap-2'>
                    <button
                      onClick={() => {
                        setInviteRevenueEdit(false)
                        handleInviteRevenueSave()
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faSave} className='mr-1' />
                      {/* <h3 className="hidden md:flex">
                                                    Save
                                                </h3> */}
                    </button>
                    <button
                      onClick={() => {
                        setInviteRevenueEdit(false)
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faXmark} className='mr-1' />
                      {/* <h3 className="hidden md:flex">
                                                    Cancel
                                                </h3> */}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <table className='text-center w-full'>
            <thead>
              <tr>
                <td className='hidden md:flex text-[15px] font-bold'>No</td>
                <td className='text-[13px] md:text-[15px] font-bold'>ID</td>
                <td className='text-[13px] md:text-[15px] font-bold'>Title</td>
                <td className='text-[13px] md:text-[15px] font-bold'>Profit</td>
                <td className='text-[13px] md:text-[15px] font-bold'>Link</td>
                <td className='text-[13px] md:text-[15px] font-bold'>Action</td>
              </tr>
            </thead>
            <tbody>
              {setting?.taskList.map((item: any, index: number) =>
                editRow !== index ? (
                  <tr key={index}>
                    <td className='hidden md:flex text-[13px] font-bold w-[16%]'>
                      {index + 1}
                    </td>
                    <td className='text-[12px] md:text-[13px] font-bold w-[16%]'>
                      {item.id}
                    </td>
                    <td className='text-[12px] md:text-[13px] w-[16%]'>
                      {item.title}
                    </td>
                    <td className='text-[12px] md:text-[13px] w-[16%]'>
                      {item.profit}
                    </td>
                    <td className='text-[12px] md:text-[13px] w-[16%]'>
                      {item.link}
                    </td>
                    <td className='text-[12px] md:text-[13px] w-[16%] space-x-4'>
                      <button
                        onClick={() => {
                          setEditRow(index)
                          setAddMode(false)
                          setSettingItem({
                            id: `${item.id}`,
                            title: `${item.title}`,
                            profit: `${item.profit}`,
                            link: `${item.link}`
                          })
                        }}
                        className='actionBtn'
                      >
                        <FontAwesomeIcon icon={faPencil} className='md:mr-1' />
                        {/* Edit */}
                      </button>
                      <button
                        onClick={() => {
                          setAddMode(false)
                          handleDelete(index)
                        }}
                        className='actionBtn'
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className='md:mr-1'
                        />
                        {/* Delete */}
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className=''>
                    <td className='hidden md:flex text-[13px] font-bold w-[16%]'>
                      {index + 1}
                    </td>

                    <td className='text-[13px] font-bold w-[16%]'>
                      <input
                        type='text'
                        className='h-[30px] w-[40px]'
                        placeholder='ID'
                        name='id'
                        value={settingItem.id}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                    </td>
                    <td className='text-[13px] font-bold w-[16%]'>
                      <input
                        type='text'
                        className='h-[30px] w-[40px]'
                        placeholder='Title'
                        name='title'
                        value={settingItem.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                    </td>
                    <td className='text-[13px] font-bold w-[16%]'>
                      <input
                        type='text'
                        className='h-[30px] w-[40px]'
                        placeholder='Profit'
                        name='profit'
                        value={settingItem.profit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                    </td>
                    <td className='text-[13px] font-bold w-[16%]'>
                      <input
                        type='text'
                        className='h-[30px] w-[40px]'
                        placeholder='Link'
                        name='link'
                        value={settingItem.link}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(e)
                        }
                      />
                    </td>
                    <td className='text-[13px] w-[16%] space-x-4'>
                      <button onClick={submitSetting} className='actionBtn'>
                        <FontAwesomeIcon icon={faSave} className='md:mr-1' />
                        {/* Save */}
                      </button>
                      <button
                        onClick={() => setEditRow(-1)}
                        className='actionBtn'
                      >
                        <FontAwesomeIcon icon={faXmark} className='md:mr-1' />
                        {/* Cancel */}
                      </button>
                    </td>
                  </tr>
                )
              )}
              {addMode && (
                <tr className=''>
                  <td className='hidden md:flex text-[13px] font-bold w-[16%]'>
                    {setting?.taskList.length + 1}
                  </td>
                  <td className='text-[13px] font-bold w-[16%]'>
                    <input
                      type='text'
                      className='h-[30px] w-[40px]'
                      placeholder='ID'
                      name='id'
                      value={settingItem.id}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                    />
                  </td>
                  <td className='text-[13px] font-bold w-[16%]'>
                    <input
                      type='text'
                      className='h-[30px] w-[40px]'
                      placeholder='Title'
                      name='title'
                      value={settingItem.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                    />
                  </td>
                  <td className='text-[13px] font-bold w-[16%]'>
                    <input
                      type='text'
                      className='h-[30px] w-[40px]'
                      placeholder='Profit'
                      name='profit'
                      value={settingItem.profit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                    />
                  </td>
                  <td className='text-[13px] font-bold w-[16%]'>
                    <input
                      type='text'
                      className='h-[30px] w-[40px]'
                      placeholder='Link'
                      name='link'
                      value={settingItem.link}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e)
                      }
                    />
                  </td>
                  <td className='text-[13px] space-x-4'>
                    <button
                      onClick={() => {
                        setAddMode(false), submitSetting()
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faSave} className='md:mr-1' />
                      {/* Save */}
                    </button>
                    <button
                      onClick={() => {
                        setAddMode(false)
                      }}
                      className='actionBtn'
                    >
                      <FontAwesomeIcon icon={faXmark} className='md:mr-1' />
                      {/* Cancel */}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            onClick={() => {
              setEditRow(setting?.taskList.length)
              setAddMode(true)
            }}
            className='actionBtn mt-8'
          >
            <FontAwesomeIcon icon={faPlus} className='mr-1' />
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default TaskSetting
