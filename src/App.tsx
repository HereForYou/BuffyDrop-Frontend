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
import Leaderboard from "./page/Leaderboard";
import { ENDPOINT } from "./data";
import Splash from "./page/Splash";
import Task from "./page/Task";
import Admin from "./page/Admin";

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
  const { user, start_param } = useTelegram();

  const [inviteMsg, setInviteMsg] = useState<boolean>(false);
  const [task, setTask] = useState<string[]>([]);
  const [setting, setSetting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  // const [tab, setTab] = useState<string>('Admin');
  const [tab, setTab] = useState<string>('Splash');
  const [start, setStart] = useState<boolean>(false);
  const [reachDailyLimit, setReachDailyLimit] = useState<boolean>(false);
  const [claimShow, setClaimShow] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [point, setPoint] = useState<number>(0.000);
  const [referral, setReferral] = useState<number>(0);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0.000);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [level, setLevel] = useState<any>({});
  const [nextLevel, setNextLevel] = useState<any>({});
  const [timeLimit, setTimeLimit] = useState<any>({});
  const [power, setPower] = useState<any>({});

  useEffect(() => {
    if (setting.levelStandard) {
      if (totalPoint <= 0) {
        setLevel(setting.levelStandard[0]);
        setNextLevel(setting.levelStandard[1]);
      }
      else {
        for (let i = 1; i < 10; i++) {
          if (totalPoint <= setting.levelStandard[i]?.coinsToLevelUp) {
            setLevel(setting.levelStandard[i - 1]);
            setNextLevel(setting.levelStandard[i]);
            axios.put(`${ENDPOINT}/api/user/level/${user?.id}`, {
              newLevel: i
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
      countdownTime = currentCount;
      setStart(true);
      let interval_Id = setInterval(async () => {
        clearInterval(interval_Id - 2);
        clearInterval(interval_Id - 1);
        setIntervalId(interval_Id);
        if (!saveIntervalId) {
          try {
            await axios.put(`${ENDPOINT}/api/user/count/${user?.id}`, {
              id: interval_Id,
              status: 'Mining'
            });
            saveIntervalId = true;
          }
          catch (err) {
            console.error('Error occurred during PUT request:', err);
          }
        }
        if (countdownTime > 0) {
          let hours = Math.floor(countdownTime / 3600);
          let minutes = Math.floor((countdownTime % 3600) / 60);
          let seconds = countdownTime % 60;
          setHour(hours);
          setMin(minutes);
          setSec(seconds);
          points += power.value;
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
  useEffect(() => {
    if (point === 0) {
      setStart(false);
    }
  }, [point]);

  const handleStopMining = () => {
    clearInterval(intervalId);
    axios.put(`${ENDPOINT}/api/user/${user?.id}`, { points: point, countDown: currentCount, status: 'Waiting' })
      .then(response => {
        console.log('response', response.data);
        let newpoint = point + totalPoint;
        setTotalPoint(newpoint);
        setPoint(0);
      })
      .catch(err => {
        console.error(err);
        // toast("Something Went Wrong!");
      })
  }

  useEffect(() => {
    if (!user) {
      hasShownWarningRef.current = true;
      axios.get(`${ENDPOINT}/api/setting/all`)
        .then(res => {
          setSetting(res.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
    if (user && !hasShownWarningRef.current && (tab == "Exchange" || tab == "Splash")) {
      if (tab == 'Exchange') {
        hasShownWarningRef.current = true;
      }
      setLoading(true);
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param
      };
      axios.get(`${ENDPOINT}/api/setting/all`)
        .then(res => {
          setSetting(res.data);
        })
        .catch(err => {
          console.error(err);
        })
      axios.post(`${ENDPOINT}/api/user/${user?.id}`, data)
        .then(response => {
          const userData = response.data.user;
          setTotalPoint(userData.totalPoints);
          setPower(userData.power);
          setTimeLimit(userData.dailyTimeLimit);
          setTask(userData.task);
          setReferral((userData.friends).length);
          clearInterval(userData.intervalId);
          points = userData.curPoints;
          countdownTime = userData.countDown;
          if (countdownTime == 0) setReachDailyLimit(true);
          setCurrentCount(countdownTime);
          if (userData.status == 'Waiting to Claim' && tab == "Exchange") {
            setClaimShow(true);
            setStart(false);
            setPoint(points);
          }
          else if (userData.status == 'Mining' && tab == "Exchange") {
            setStart(true);
            setClaimShow(false);
            handleMining();
          }
          if (start_param && !inviteMsg && start_param != userData.inviteLink) {
            toast.success("You are invited!");
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
      <div className={`h-full max-h-screen overflow-hidden w-full`}>
        <div className={`relative h-screen overflow-hidden pb-[64px] px-[20px]`}>
          {
            (user && tab == 'Splash') && <Splash power={power} level={level} totalPoint={totalPoint}
              referral={referral} setTab={setTab} />
          }
          {
            (user && tab == 'Exchange') && <Exchange user={user} point={point} totalPoint={totalPoint}
              handleMining={handleMining} handleStopMining={handleStopMining} claimShow={claimShow}
              setTotalPoint={setTotalPoint} setClaimShow={setClaimShow}
              reachDailyLimit={reachDailyLimit}
              setReachDailyLimit={setReachDailyLimit}
              start={start} hour={hour} min={min} sec={sec}
              timeLimit={timeLimit} power={power}
              level={level} nextLevel={nextLevel}
              loading={loading} />
          }
          {
            (user && tab == 'Mine') && <Mine power={power} setPower={setPower} timeLimit={timeLimit} setTimeLimit={setTimeLimit}
              setCurrentCount={setCurrentCount} currentCount={currentCount} user={user} setting={setting}
              totalPoint={totalPoint} setTotalPoint={setTotalPoint} level={level} nextLevel={nextLevel} loading={loading} />
          }
          {
            (user && tab == 'Friends') && <Friends user={user} inviteRevenue={setting.inviteRevenue} />
          }
          {
            (user && tab == 'Task') && <Task user={user} totalPoint={totalPoint} setTotalPoint={setTotalPoint} setting={setting} task={task} setTask={setTask} />
          }
          {
            (user && tab == 'Leaderboard') && <Leaderboard user={user} />
          }
          {
            <Admin setting={setting} setSetting={setSetting} />
          }
          <ToastContainer />
        </div>
        {
          (tab !== 'Splash' && tab !== 'Admin') && <Footer tab={tab} setTab={setTab} />
        }
      </div>
    </Router >
  );
}

export default App;
