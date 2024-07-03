import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Exchange from "./page/Exchange";
import { useTelegram } from "./hooks/useTelegram";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Mine from "./page/Mine";
import Friends from "./page/Friends";
import Airdrop from "./page/AirDrop";
import { ENDPOINT } from "./data";
import Splash from "./page/Splash";
import Task from "./page/Task";

// const user = {
//   id: '6552593434',
//   username: 'sniper131388',
//   first_name: 'High',
//   last_name: 'Tech',
// };
// const start_param = '';

function App() {
  let countdownTime = 1;
  let points = 0;
  let saveIntervalId = false;

  const hasShownWarningRef = useRef(false);
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);

  const [task, setTask] = useState<string[]>([]);
  const [setting, setSetting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>('Splash');
  const { user, start_param } = useTelegram();
  const [start, setStart] = useState<boolean>(false);
  const [reachDailyLimit, setReachDailyLimit] = useState<boolean>(false);
  const [claimShow, setClaimShow] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>();
  const [point, setPoint] = useState<number>(0.000);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0.000);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [dailyTimeLimit, setDailyTimeLimit] = useState<number>(30);
  const [level, setLevel] = useState<any>({});
  const [nextLevel, setNextLevel] = useState<any>({})

  useEffect(() => {
    if (setting.length > 0) {
      if (totalPoint <= 0) {
        setLevel(setting[0]);
        setNextLevel(setting[1]);
      }
      else {
        for (let i = 1; i < 10; i++) {
          if (totalPoint <= setting[i]?.coinsToLevelUp) {
            setLevel(setting[i - 1]);
            setNextLevel(setting[i]);
            axios.put(`${ENDPOINT}/api/user/level/${user?.id}`, {
              currentLevel: i
            })
              .then(response => {
                console.log('response', response.data);
              })
              .catch(error => {
                console.error('Error occurred during PUT request:', error);
              });
            break;
          }
        }
      }
    }
  }, [setting, totalPoint]);

  const handleMining = () => {
    if (user) {
      setStart(true);
      countdownTime = currentCount;
      let interval_Id = setInterval(() => {
        setIntervalId(interval_Id);
        if (!saveIntervalId) {
          axios.put(`${ENDPOINT}/api/user/count/${user?.id}`, {
            id: interval_Id,
            status: 'Mining'
          })
            .then(response => {
              console.log('response', response.data);
              saveIntervalId = true;
            })
            .catch(error => {
              console.error('Error occurred during PUT request:', error);
            });
        }
        if (countdownTime > 0) {
          let hours = Math.floor(countdownTime / 3600);
          let minutes = Math.floor((countdownTime % 3600) / 60);
          let seconds = countdownTime % 60;
          setHour(hours);
          setMin(minutes);
          setSec(seconds);
          points += level.earnPerSecond;
          setPoint(points);
          countdownTime--;
          setCurrentCount(countdownTime);
        }
        else {
          clearInterval(interval_Id);
          setStart(false);
          setClaimShow(true);
          points = 0;
        }
      }, 1000);
    }
  };

  const handleStopMining = () => {
    clearInterval(intervalId);
    setStart(false);
    axios.put(`${ENDPOINT}/api/user/${user?.id}`, { points: point, countDown: currentCount, status: 'Waiting' })
      .then(response => {
        console.log('response', response.data);
        let newpoint = point + totalPoint;
        setTotalPoint(newpoint);
      })
      .catch(err => {
        console.error(err);
        // toast("Something Went Wrong!");
      })
  }

  useEffect(() => {
    if (user && !hasShownWarningRef.current && (tab == "Exchange" || tab == "Splash")) {
      // hasShownWarningRef.current = true;
      setLoading(true);
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param
      };
      axios.get(`${ENDPOINT}/api/setting/all`)
        .then(res => {
          setSetting(res.data.levelStandard);
          setDailyTimeLimit(res.data.dailyTimeLimit);
        })
        .catch(err => {
          console.error(err);
        })
      axios.post(`${ENDPOINT}/api/user/${user?.id}`, data)
        .then(response => {
          const userInfo = response.data.user;
          setTotalPoint(userInfo.totalPoints);
          setTask(userInfo.task);
          clearInterval(userInfo.intervalId);
          points = userInfo.curPoints;
          countdownTime = userInfo.countDown;
          // if (countdownTime > dailyTimeLimit * 60) countdownTime = dailyTimeLimit * 60;
          if (countdownTime == 0) setReachDailyLimit(true);
          setCurrentCount(countdownTime);
          if (userInfo.status == 'Waiting to Claim') {
            setClaimShow(true);
            setStart(false);
            setPoint(points);
          }
          else if (userInfo.status == 'Mining') {
            setStart(true);
            handleMining();
          }
          if (start_param && !inviteMsg && start_param != userInfo.inviteLink) {
            toast.success("Successfully Invited!");
            setInviteMsg(true);
          }
          setLoading(false);
        })
        .catch(error => {
          // toast.error("error", error);
          console.error('Error occurred during PUT request:', error);
        });
    }
  }, [tab]);

  return (
    <Router>
      <div className={`h-full max-h-screen overflow-hidden w-full md:w-[400px] md:mx-auto
        ${tab == 'Splash' && 'bg-splash-back'}
        ${tab == 'Exchange' && 'bg-home-back'}
        ${tab == 'Mine' && 'bg-mine-back'}
        ${tab == 'Friends' && 'bg-friend-back'}
        ${tab == 'Task' && 'bg-task-back'}
        ${tab == 'Airdrop' && 'bg-airdrop-back'}
        bg-cover`}>
        <div className={`relative h-screen overflow-hidden pb-[64px] px-[20px]`}>
          {
            tab == 'Splash' && <Splash setTab={setTab} setting={setting} setSetting={setSetting} dailyTimeLimit={dailyTimeLimit} setDailyTimeLimit={setDailyTimeLimit} />
          }
          {
            tab == 'Exchange' && <Exchange user={user} point={point} totalPoint={totalPoint}
              handleMining={handleMining} handleStopMining={handleStopMining} claimShow={claimShow}
              setTotalPoint={setTotalPoint} setClaimShow={setClaimShow} reachDailyLimit={reachDailyLimit} setReachDailyLimit={setReachDailyLimit}
              start={start} hour={hour} min={min} sec={sec} dailyTimeLimit={dailyTimeLimit} level={level} nextLevel={nextLevel} loading={loading} />
          }
          {
            tab == 'Mine' && <Mine totalPoint={totalPoint} level={level} nextLevel={nextLevel} loading={loading} />
          }
          {
            tab == 'Friends' && <Friends user={user} />
          }
          {
            tab == 'Task' && <Task user={user} totalPoint={totalPoint} setTotalPoint={setTotalPoint} task={task} setTask={setTask} />
          }
          {
            tab == 'Airdrop' && <Airdrop />
          }
          <ToastContainer />
        </div>
        <Footer tab={tab} setTab={setTab} />
      </div>
    </Router >
  );
}

export default App;
