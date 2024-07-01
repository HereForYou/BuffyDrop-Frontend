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
import Earn from "./page/Earn";
import Airdrop from "./page/AirDrop";
import { levelStandard, ENDPOINT } from "./data";
import Splash from "./page/Splash";

function App() {
  let countdownTime = 60;
  let points = 0;

  const hasShownWarningRef = useRef(false);
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);

  // const [task, setTask] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<string>('Splash');
  const { user, start_param } = useTelegram();
  const [start, setStart] = useState<boolean>(false);
  const [claimShow, setClaimShow] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>();
  const [point, setPoint] = useState<number>(0.000);
  const [totalPoint, setTotalPoint] = useState<number>(0.000);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [level, setLevel] = useState<any>({
    level: 1,
    earnPerSecond: 1,
    coinsToLevelUp: 10000,
  });

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      if (levelStandard[i].coinsToLevelUp >= totalPoint) {
        setLevel(levelStandard[i]);
        break;
      }
    }
  }, [totalPoint]);

  const handleMining = () => {
    if (!user) {
      countdownTime = 60;
      setStart(true);
      let interval_Id = setInterval(() => {
        setIntervalId(interval_Id);
        if (countdownTime >= 0) {
          let hours = Math.floor(countdownTime / 3600);
          let minutes = Math.floor((countdownTime % 3600) / 60);
          let seconds = countdownTime % 60;
          setHour(hours);
          setMin(minutes);
          setSec(seconds);
          points += level.earnPerSecond;
          setPoint(points);
          countdownTime--;
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
    let newpoint = point + points;
    setTotalPoint(newpoint);
  }

  useEffect(() => {
    setTab('Splash');
    setTimeout(() => {
      setTab('Exchange');
    }, 1500);
  }, []);

  useEffect(() => {
    if (user && !hasShownWarningRef.current && tab == "Exchange") {
      hasShownWarningRef.current = true;
      // setLoading(true);
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        countLimit: 12 * 60 * 60,
        start_param: start_param
      };
      axios.post(`${ENDPOINT}/api/user/${user?.id}`, data)
        .then(response => {
          const userInfo = response.data.user;
          setTotalPoint(userInfo.totalPoints);
          // setTask(userInfo.task);
          clearInterval(userInfo.intervalId);
          points = userInfo.curPoints;
          countdownTime = userInfo.countDown;
          if (countdownTime == 0 && points != 0) {
            setClaimShow(true);
            setStart(false);
            setPoint(points);
          }
          else if (countdownTime != 0 && points != 0) {
            setStart(true);
            handleMining();
          }
          else if (countdownTime == 0 && points == 0) {
            countdownTime = 12 * 60 * 60;
          }
          if (start_param && !inviteMsg && start_param != userInfo.inviteLink) {
            toast.success("Successfully Invited!");
            setInviteMsg(true);
          }
          // setLoading(false);
        })
        .catch(error => {
          // toast.error("error", error);
          console.error('Error occurred during PUT request:', error);
        });
    }
  }, [tab]);

  return (
    <Router>
      <div className={`h-full max-h-screen overflow-hidden w-full md:w-[30%] 
        ${tab == 'Splash' && 'bg-splash-back'}
        ${tab == 'Exchange' && 'bg-home-back'}
        ${tab == 'Mine' && 'bg-mine-back'}
        ${tab == 'Friends' && 'bg-friend-back'}
        ${tab == 'Earn' && 'bg-task-back'}
        ${tab == 'Airdrop' && 'bg-airdrop-back'}
        bg-cover`}>
        <div className="h-screen overflow-auto pb-[64px] pt-[40px] px-[20px]">
          {
            tab == 'Splash' && <Splash />
          }
          {
            tab == 'Exchange' && <Exchange user={user} point={point} totalPoint={totalPoint}
              handleMining={handleMining} handleStopMining={handleStopMining} claimShow={claimShow}
              setTotalPoint={setTotalPoint} setClaimShow={setClaimShow}
              start={start} hour={hour} min={min} sec={sec} />
          }
          {
            tab == 'Mine' && <Mine />
          }
          {
            tab == 'Friends' && <Friends />
          }
          {
            tab == 'Earn' && <Earn />
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
