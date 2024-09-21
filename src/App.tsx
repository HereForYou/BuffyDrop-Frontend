import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Exchange from "./page/Exchange";
import { useTelegram } from "./hooks/useTelegram";
import axios from "axios";
import { useTimeContext } from "./context/TimeContextProvider";
import { toast } from "react-hot-toast";
import Footer from "./component/Footer";
import Friends from "./page/Friends";
import Leaderboard from "./page/Leaderboard";
import { ENDPOINT } from "./data";
import Splash from "./page/Splash";
import Task from "./page/Task";
import Admin from "./page/Admin";
// import { isMobileDevice } from './utils/mobileDetect'
import { rankAvatarThemes } from "./utils/constants";
import LandingLoader from "./component/LandingLoader";
// const user = {
//   id: "7202566331",
//   username: "SmartFox",
//   first_name: "Olaf",
//   last_name: "",
// };
// const start_param = "";

function App() {
  const hasShownWarningRef = useRef(false);
  const { user, start_param } = useTelegram();
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);
  const [task, setTask] = useState<string[]>([]);
  const [setting, setSetting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("Splash");
  const [title, setTitle] = useState<string>("");
  const [totalPoint, setTotalPoint] = useState<number>(0.0);
  const [ranking, setRanking] = useState<number>();
  const {
    isTimingStarted,
    minedAmount,
    remainTime,
    totalTime,
    setIsTimingStarted,
    setMinedAmount,
    setNotReceivedAmount,
    setRemainTime,
    setTotalPoints,
    setTotalTime,
    setUserId,
  } = useTimeContext();

  useEffect(() => {
    injectSpeedInsights();
    // setIsMobile(isMobileDevice())
    if (!user) {
      hasShownWarningRef.current = true;
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // or any value you prefer
          },
        })
        .then((res) => {
          setSetting(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (
      user &&
      !hasShownWarningRef.current &&
      (tab == "Exchange" || tab == "Splash")
    ) {
      if (tab == "Exchange") {
        hasShownWarningRef.current = true;
      }
      setUserId(user?.id.toString());
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param,
        style: rankAvatarThemes[Math.floor(Math.random() * 21)],
      };
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // or any value you prefer
          },
        })
        .then((res) => {
          setLoading(true);
          setSetting(res.data);
          axios
            .post(`${ENDPOINT}/api/user/${user?.id}`, data)
            .then((response) => {
              console.log("Initial Response > ", response);
              const resRemainTime = Math.round(response.data.remainTime);
              const userData = response.data.user;
              console.log("ResRemainTime", resRemainTime, userData.cliamed);
              if (response.data.signIn) setTab("Exchange");
              if (resRemainTime === 0 && !userData.cliamed) {
                console.log("not claimed");
                setNotReceivedAmount(60);
                setMinedAmount(60);
                setTotalTime(0);
              }
              if (resRemainTime === 0 && userData.cliamed) {
                setTotalTime(60);
              }
              if (resRemainTime > 0) {
                setMinedAmount(resRemainTime);
                setIsTimingStarted(true);
                setTotalTime(60 - resRemainTime);
              }
              setTotalPoints(userData.totalPoints);
              setRanking(response?.data?.user?.joinRank);
              setTask(userData.task);
              if (
                start_param &&
                !inviteMsg &&
                start_param != userData.inviteLink
              ) {
                toast.success("You are invited!");
                setInviteMsg(true);
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error occurred during PUT request:", error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // const handleBeforUnload = () => {  //============================== When close the mini app
    //   console.log("Before Unload");
    //   endMining();
    // };
    // window.addEventListener("beforeunload", handleBeforUnload);
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforUnload);
    // };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainTime < totalTime && isTimingStarted) {
        duringMining();
      }
    }, 1000);
    if (remainTime === totalTime && totalTime !== 0) {
      endMining();
    }
    return () => {
      clearInterval(interval);
    };
  }, [remainTime, isTimingStarted]);

  const endMining = () => {
    setIsTimingStarted(false);
    console.log("End Mining > minedAmount > ", minedAmount);
    setTotalTime(0);
    setMinedAmount(60);
  };

  const duringMining = () => {
    console.log("duringMining > ", minedAmount);
    setRemainTime((prev) => prev + 1);
    setMinedAmount((prev) => prev + 1);
  };

  return (
    <Router>
      {loading ? (
        <LandingLoader />
      ) : user ? (
        <div
          className={`h-full relative max-h-screen overflow-hidden max-w-[560px] w-full font-roboto`}>
          <div className={`flex h-screen overflow-hidden pb-4 w-full`}>
            {tab == "Splash" && <Splash ranking={ranking} setTab={setTab} />}
            {tab == "Exchange" && (
              <Exchange setTab={setTab} setTitle={setTitle} user={user} />
            )}
            {tab == "Friends" && (
              <Friends
                user={user}
                inviteRevenue={setting.inviteRevenue}
                modal={false}
              />
            )}
            {tab == "INVITE" && (
              <Friends
                user={user}
                inviteRevenue={setting.inviteRevenue}
                modal={true}
              />
            )}
            {tab == "Channel" && (
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
            {tab == "Buffy" && (
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
            {tab == "Leaderboard" && <Leaderboard user={user} />}
          </div>
          {tab !== "Splash" && tab !== "Admin" && (
            <Footer tab={tab} setTab={setTab} />
          )}
        </div>
      ) : (
        <Admin setting={setting} setSetting={setSetting} />
      )}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
