import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loader from '../component/Loader'
import { toast } from 'react-hot-toast'
// import { faClone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InviteCard from '../component/InviteCard'
import FriendCard from '../component/FriendCard'
import LimiteModal from '../component/LimiteModal'
import { ENDPOINT } from '../data'

const desText = `\nJoin me because there’s a reason for spreading the BUFFY buzz. It’s now or never for the BUFFY drop!🍖`

const Friends = ({
  user,
  inviteRevenue,
  modal
}: {
  user: any
  inviteRevenue: number
  modal: boolean
}) => {
  const [showModal, setShowModal] = useState<boolean>(modal)
  const [inviteLink, setInviteLink] = useState<string>('')
  const [friends, setFriends] = useState<object[]>([])
  // const [totalFriendPoints, setTotalFriendPoints] = useState<number>(0.0);
  const hasShownWarningRef = useRef(false)
  const [limiteModal, setLimiteModal] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (!hasShownWarningRef.current && user) {
      //https:reques
      setLoading(true)
      axios
        .get(`${ENDPOINT}/api/user/friend/${user?.id}`,{
          headers: {
            'ngrok-skip-browser-warning': 'true' // or any value you prefer
          }
        })
        .then(res => {
          let userInfo = res.data
          console.log('userInfo', userInfo)

          setInviteLink(userInfo.inviteLink)
          setFriends(userInfo.friendsInfo)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          // toast.error("Something Went Wrong!");
        })
      hasShownWarningRef.current = true
    }
  }, [])
  //clipBoard
  function legacyCopy (value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  const handleClipBoardCopy = async () => {
    legacyCopy(`
https://t.me/Dog82027bot/DogBot?startapp=${inviteLink}
${desText}`)
    toast.success('Successfully Copied!')
  }
  return (
    <div className='flex flex-col h-full w-full justify-start px-[20px] gap-4 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      <h1 className='text-xl font-bold text-[#acacac] pt-10'>Invite friends</h1>
      <h1 className='text-xl font-bold text-[#acacac] pb-2'>
        and get more BUFFYS
      </h1>
      <div className='w-full flex justify-center'>
        <img
          src='/friends_bg.png'
          alt='friends_bg'
          className='h-full px-12 py-2'
        />
      </div>
      <div className="flex flex-col justify-between items-start px-6 text-[#acacac]">
        {friends.length != 0 && (
          <h3 className="text-left text-xl font-bold">
            <span>{friends.length}</span> friends
          </h3>
        )}
      </div>
      <div className="mt-3 space-y-2 overflow-auto h-full">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader width="30" />
          </div>
        ) : friends.length > 0 ? (
          friends.map((friend: any) => {
            return (
              <FriendCard
                key={friend.userName}
                name={friend.userName}
                value={friend.totalPoints}
              />
            );
          })
        ) : (
          <div>
            <h4 className="pt-4 text-[#acacac]">
              Tap on the button to invite your friends
            </h4>
          </div>
        )}
      </div>
      <div className='bottom-[10vh] w-full relative'>
        <InviteCard
          title='Invite Friends'
          profit={inviteRevenue}
          setShowModal={setShowModal}
        />
      </div>
      <div
        className={`absolute bg-[#4b37dd] z-50 rounded-xl flex flex-col w-full right-0 text-[#acacac] px-4 py-2 pb-8 gap-2 transition-all duration-500 ease-out transform ${
          showModal ? 'bottom-[60px]' : 'bottom-[-400px]'
        }`}
      >
        <div className='w-full flex flex-col gap-2'>
          <div className='h-[5px] rounded-full w-[80px] bg-black opacity-80 self-center'/>
          <h2 className='text-2xl text-white font-bold'>Invite Friends</h2>
        </div>
        <h4 className='text-[16px] text-gray opacity-70'>
          You have <span className='text-yellow-400 font-bold'>Unlimited</span>{' '}
          invitations available
        </h4>
        <a
          href={`https://t.me/share/url?url=https://t.me/Dog82027bot/DogBot?startapp=${inviteLink}&text=${desText}`}
          target='blank'
          className='bg-[#110d33] p-[4px] rounded-xl text-white font-semibold transition relative duration-200 hover:translate-y-[2px]'
        >
          <div className=' cursor-pointer py-2 hover:text-[#4b37dd] rounded-xl'>
            {/* <FontAwesomeIcon icon={faPaperPlane} className='mr-5' /> */}
            Send
          </div>
        </a>
        <div className='bg-[#110d33] p-[4px] text-white font-semibold rounded-xl transition relative duration-200 hover:translate-y-[2px]'>
          <p
            onClick={handleClipBoardCopy}
            className=' cursor-pointer hover:text-[#4b37dd] py-2 rounded-xl '
          >
            {/* <FontAwesomeIcon icon={faClone} className='mr-5' /> */}
            Copy Link
          </p>
        </div>
        <div className='bg-[#110d33] p-[4px] text-white font-semibold rounded-xl transition relative duration-200 hover:translate-y-[2px]'>
          <p
            onClick={() => setShowModal(false)}
            className=' cursor-pointer hover:text-[#4b37dd] py-2 rounded-xl '
          >
            Cancel
          </p>
        </div>
        <p className='text-left pl-1 cursor-pointer underline hover:text-white  transition-all duration-200' onClick={()=>setLimiteModal(true)}>How is the referral reward calculated?</p>
      </div>
      <LimiteModal limitModal={limiteModal} handleClose={() => setLimiteModal(false)} />
    </div>
  )
}
export default Friends
