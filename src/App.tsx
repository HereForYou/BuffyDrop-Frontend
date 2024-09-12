import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { useState, useEffect, useRef } from 'react'
import Exchange from './page/Exchange'
// import { useTelegram } from "./hooks/useTelegram";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import Footer from './component/Footer'
import Mine from './page/Mine'
import Friends from './page/Friends'
import Leaderboard from './page/Leaderboard'
import { ENDPOINT } from './data'
import Splash from './page/Splash'
import Task from './page/Task'
import Admin from './page/Admin'
import { isMobileDevice } from './utils/mobileDetect'
import QRCode from 'qrcode.react'
import { getUserAvatarUrl } from './utils/functions'
const user = {
  id: '7211451993',
  username: 'super0827',
  first_name: 'Super',
  last_name: ''
}
const start_param = ''

function App () {
  let countdownTime = 1
  const hasShownWarningRef = useRef(false)
  // const { user, start_param } = useTelegram();
  const [photo_url, setPhotoUrl] = useState<string | null>(null)
  const [inviteMsg, setInviteMsg] = useState<boolean>(false)
  const [task, setTask] = useState<string[]>([])
  const [setting, setSetting] = useState<any>({})
  const [exchange, setExchange] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<string>('Splash')
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
  const [power, setPower] = useState<any>({})

  const [isMobile, setIsMobile] = useState<boolean>(false)

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
    if (!user) {
      hasShownWarningRef.current = true
      axios
        .get(`${ENDPOINT}/api/setting/all`)
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
        .get(`${ENDPOINT}/api/setting/all`)
        .then(res => {
          setSetting(res.data)
          axios
            .post(`${ENDPOINT}/api/user/${user?.id}`, data)
            .then(response => {
              const userData = response.data.user
              setExchange(userData.dex)
              setTotalPoint(userData.totalPoints)
              setPower(res.data.powerList[userData.power.id - 1])
              setTimeLimit(userData.dailyTimeLimit)
              setTask(userData.task)
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
    if (start && currentCount > 0) {
      interval = setInterval(() => {
        let hours = Math.floor(currentCount / 3600)
        let minutes = Math.floor((currentCount % 3600) / 60)
        let seconds = currentCount % 60
        setHour(hours)
        setMin(minutes)
        setSec(seconds)
        setPoint(prevPoints => prevPoints + power.value)
        setCurrentCount(prevSeconds => prevSeconds - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [start, currentCount])

  useEffect(() => {
    setIsMobile(!isMobileDevice())
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
      {user && isMobile && (
        <div className={`h-full max-h-screen overflow-hidden w-full`}>
          <div
            className={`relative h-screen overflow-hidden pb-[64px] px-[0px]`}
          >
            {tab == 'Splash' && (
              <Splash
                power={power}
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
                power={power}
                level={level}
                nextLevel={nextLevel}
                loading={loading}
                setting={setting}
                exchange={exchange}
                setExchange={setExchange}
              />
            )}
            {tab == 'Mine' && (
              <Mine
                power={power}
                setPower={setPower}
                timeLimit={timeLimit}
                setTimeLimit={setTimeLimit}
                setCurrentCount={setCurrentCount}
                currentCount={currentCount}
                user={user}
                setting={setting}
                totalPoint={totalPoint}
                setTotalPoint={setTotalPoint}
                level={level}
                nextLevel={nextLevel}
                loading={loading}
              />
            )}
            {tab == 'Friends' && (
              <Friends user={user} inviteRevenue={setting.inviteRevenue} />
            )}
            {tab == 'Task' && (
              <Task
                user={user}
                totalPoint={totalPoint}
                setTotalPoint={setTotalPoint}
                setting={setting}
                task={task}
                setTask={setTask}
              />
            )}
            {tab == 'Leaderboard' && <Leaderboard user={user} />}
            <ToastContainer />
          </div>
          {tab !== 'Splash' && tab !== 'Admin' && (
            <Footer tab={tab} setTab={setTab} />
          )}
        </div>
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
      {!isMobile && user && (
        <div className='flex flex-col justify-center items-center gap-2'>
          <h2 className='text-[24px] text-white font-bold'>
            Play on your mobile
          </h2>
          <QRCode value='https://t.me/Bleggesminer_bot' size={256} />
          <a
            href='https://t.me/Bleggesminer_bot'
            className='text-[24px] text-white font-bold hover:text-white'
          >
            @Bleggesminer_bot
          </a>
        </div>
      )}
    </Router>
  )
}

export default App
