import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Exchange from "./page/Exchange";
import { useTelegram } from "./hooks/useTelegram";
// import Ranking from "./page/Ranking";
// import Task from "./page/Task";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Loading from "./component/Loading";
import Boost from "./page/Boost";
import Mine from "./page/Mine";
import Friends from "./page/Friends";
import Earn from "./page/Earn";
import Airdrop from "./page/AirDrop";

function App() {
  let countdownTime = 10;
  let points = -0.002;

  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<string>('Exchange');
  const { user } = useTelegram();
  const [start, setStart] = useState<boolean>(false);
  const [claimShow, setClaimShow] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>();
  const [point, setPoint] = useState<number>(0.000);
  const [totalPoint, setTotalPoint] = useState<number>(0.000);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const handleMining = () => {
    if (user) {
      countdownTime = 10;
      setStart(true);
      let interval_Id = setInterval(() => {
        setIntervalId(interval_Id);
        console.log("setIntervalId", interval_Id);
        if (countdownTime >= 0) {
          let hours = Math.floor(countdownTime / 3600);
          let minutes = Math.floor((countdownTime % 3600) / 60);
          let seconds = countdownTime % 60;
          setHour(hours);
          setMin(minutes);
          setSec(seconds);
          points += 0.002;
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

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-full max-h-screen overflow-hidden w-full">
          <div className="h-screen overflow-auto pb-[84px] px-[20px] dM-Sans bg-[white]">
            {
              tab == 'Exchange' && <Exchange user={user} point={point} totalPoint={totalPoint}
                handleMining={handleMining} handleStopMining={handleStopMining} claimShow={claimShow}
                setTotalPoint={setTotalPoint} setClaimShow={setClaimShow}
                start={start} hour={hour} min={min} sec={sec} />
            }
            {
              tab == 'Boost' && <Boost />
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
      )
      }
    </Router >
  );
}

export default App;
