import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { useState, useEffect, useRef } from 'react'
import Exchange from './page/Exchange'
import { useTelegram } from './hooks/useTelegram'
import axios from 'axios'
import { toast } from 'react-hot-toast'
// import { ToastContainer } from 'react-toastify'
import Footer from './component/Footer'
// import Mine from './page/Mine'
import Friends from './page/Friends'
// import BuffyCommunity from './component/BuffyCommunity'

import Leaderboard from './page/Leaderboard'
import { ENDPOINT } from './data'
import Splash from './page/Splash'
import Task from './page/Task'
import Admin from './page/Admin'
// import { isMobileDevice } from './utils/mobileDetect'
// import QRCode from 'qrcode.react'
import { getUserAvatarUrl } from './utils/functions'
import Loader from './component/Loader'
// const user = {
//   id: '7211451993',
//   username: 'super0827',
//   first_name: 'Super',
//   last_name: ''
// }
// const start_param = ''

function App () {
  let countdownTime = 1
  const hasShownWarningRef = useRef(false)
  const { user, start_param } = useTelegram()
  const [photo_url, setPhotoUrl] = useState<string | null>(null)
  const [inviteMsg, setInviteMsg] = useState<boolean>(false)
  const [task, setTask] = useState<string[]>([])
  const [setting, setSetting] = useState<any>({})
  const [exchange, setExchange] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<string>('Splash')
  const [title, setTitle] = useState<string>('')
  const [start, setStart] = useState<boolean>(false)
  const [reachDailyLimit, setReachDailyLimit] = useState<boolean>(false)
  const [claimShow, setClaimShow] = useState<boolean>(false)
  const [point, setPoint] = useState<number>(0.0)
  const [referral, setReferral] = useState<number>(0)
  const [currentCount, setCurrentCount] = useState<number>(0)
  const [totalPoint, setTotalPoint] = useState<number>(0.0)
  const [hour, setHour] = useState<number>(0)
  const [min, setMin] = useState<number>(0)
  const [sec, setSec] = useState<number>(0)

  const [level, setLevel] = useState<any>({})
  const [nextLevel, setNextLevel] = useState<any>({})
  const [timeLimit, setTimeLimit] = useState<any>({})
  const [ranking, setRanking] = useState<number>()

  // const [isMobile, setIsMobile] = useState<boolean>(false)
  console.log('user----------------', user)

  useEffect(() => {
    if (setting.levelStandard) {
      if (totalPoint <= 0) {
        setLevel(setting.levelStandard[0])
        setNextLevel(setting.levelStandard[1])
      } else {
        for (let i = 1; i < 10; i++) {
          if (totalPoint <= setting.levelStandard[i]?.coinsToLevelUp) {
            setLevel(setting.levelStandard[i - 1])
            setNextLevel(setting.levelStandard[i])
            axios
              .put(`${ENDPOINT}/api/user/level/${user?.id}`, {
                newLevel: i
              })
              .then(res => {
                console.log('response', res.data)
                setRanking(res.data.joinRank)
              })
              .catch(error => {
                console.error('Error occurred during PUT request:', error)
              })
            break
          }
        }
      }
    }
  }, [setting, totalPoint])

  useEffect(() => {
    if (point === 0) {
      setStart(false)
    }
  }, [point])

  useEffect(() => {
    console.log('useEffect tag')
    if (!user) {
      console.log('useEffect tag user is not set')
      hasShownWarningRef.current = true
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            'ngrok-skip-browser-warning': 'true' // or any value you prefer
          }
        })
        .then(res => {
          setSetting(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
    if (
      user &&
      !hasShownWarningRef.current &&
      (tab == 'Exchange' || tab == 'Splash')
    ) {
      if (tab == 'Exchange') {
        hasShownWarningRef.current = true
      }
      setLoading(true)
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param
      }
      getUserAvatarUrl((user?.id).toString()).then(url => setPhotoUrl(url))
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            'ngrok-skip-browser-warning': 'true' // or any value you prefer
          }
        })
        .then(res => {
          setSetting(res.data)
          axios
            .post(`${ENDPOINT}/api/user/${user?.id}`, data)
            .then(response => {
              const userData = response.data.user
              if (response.data.signIn) setTab('Exchange')
              setExchange(userData.dex)
              setTotalPoint(userData.totalPoints)
              // setPower(res.data.powerList[userData.power.id - 1])
              console.log('============>', response.data)
              setRanking(res.data.joinRank)
              setTask(userData.task)
              setTimeLimit(userData.dailyTimeLimit)
              setReferral(userData.friends.length)
              countdownTime = userData.countDown
              if (countdownTime == 0) setReachDailyLimit(true)
              setCurrentCount(countdownTime)
              if (
                start_param &&
                !inviteMsg &&
                start_param != userData.inviteLink
              ) {
                toast.success('You are invited!')
                setInviteMsg(true)
              }
              setLoading(false)
            })
            .catch(error => {
              console.error('Error occurred during PUT request:', error)
            })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [tab])

  useEffect(() => {
    let interval = 0
    let hours = interval + Math.floor(currentCount / 3600)
    let minutes = Math.floor((currentCount % 3600) / 60)
    let seconds = currentCount % 60
    setHour(hours)
    setMin(minutes)
    setSec(seconds)
    setPoint(prevPoints => prevPoints)
    setCurrentCount(prevSeconds => prevSeconds - 1)
    // setIsMobile(isMobileDevice())
  }, [])

  const handleMining = () => {
    if (user) {
      setStart(true)
    }
  }

  const handleStopMining = () => {
    setStart(false)
    axios
      .put(`${ENDPOINT}/api/user/${user?.id}`, {
        points: point,
        countDown: currentCount
      })
      .then(res => {
        if (res.data) {
          setTotalPoint(prevPoints => prevPoints + point)
          setPoint(0)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Router>
      {loading ? (
        <div className='flex flex-col relative pt-32 justify-center items-center gap-20 h-screen w-full'>
          <img src='/dogAvatar.png' className='absolute w-32 top-1/4' />
          <Loader width='80' />
        </div>
      ) : (
        user && (
          <div
            className={`h-full relative max-h-screen overflow-hidden max-w-[560px] w-full`}
          >
            <div className={`flex h-screen overflow-hidden pb-[64px] w-full`}>
              {tab == 'Splash' && (
                <Splash
                  ranking={ranking}
                  totalPoint={totalPoint}
                  referral={referral}
                  setTab={setTab}
                />
              )}
              {tab == 'Exchange' && (
                <Exchange
                  user={user}
                  photo_url={photo_url}
                  point={point}
                  totalPoint={totalPoint}
                  handleMining={handleMining}
                  handleStopMining={handleStopMining}
                  claimShow={claimShow}
                  setTotalPoint={setTotalPoint}
                  setClaimShow={setClaimShow}
                  reachDailyLimit={reachDailyLimit}
                  setReachDailyLimit={setReachDailyLimit}
                  start={start}
                  hour={hour}
                  min={min}
                  sec={sec}
                  timeLimit={timeLimit}
                  level={level}
                  nextLevel={nextLevel}
                  loading={loading}
                  setting={setting}
                  exchange={exchange}
                  setExchange={setExchange}
                  tab={tab}
                  setTab={setTab}
                  title={title}
                  setTitle={setTitle}
                />
              )}
              {tab == 'Friends' && (
                <Friends
                  user={user}
                  inviteRevenue={setting.inviteRevenue}
                  modal={false}
                />
              )}
              {tab == 'INVITE' && (
                <Friends
                  user={user}
                  inviteRevenue={setting.inviteRevenue}
                  modal={true}
                />
              )}
              {tab == 'Channel' && (
                <Task
                  title={title}
                  user={user}
                  totalPoint={totalPoint}
                  setTotalPoint={setTotalPoint}
                  setting={setting}
                  task={task}
                  setTask={setTask}
                />
              )}
              {tab == 'Buffy' && (
                <Task
                  title={title}
                  user={user}
                  totalPoint={totalPoint}
                  setTotalPoint={setTotalPoint}
                  setting={setting}
                  task={task}
                  setTask={setTask}
                />
              )}
              {tab == 'Leaderboard' && <Leaderboard user={user} />}
            </div>
            {tab !== 'Splash' && tab !== 'Admin' && (
              <Footer tab={tab} setTab={setTab} />
            )}
          </div>
        )
      )}
      {!user && (
        <div className={`h-full max-h-screen overflow-hidden w-full`}>
          <div
            className={`relative h-screen overflow-hidden pb-[64px] px-[20px]`}
          >
            <Admin setting={setting} setSetting={setSetting} />
          </div>
        </div>
      )}
    </Router>
  )
}

export default App
