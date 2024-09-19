import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import Exchange from "./page/Exchange";
import { useTelegram } from './hooks/useTelegram'
import axios from "axios";
import { toast } from "react-hot-toast";
import Footer from "./component/Footer";
import Friends from "./page/Friends";

import Leaderboard from "./page/Leaderboard";
import { ENDPOINT } from "./data";
import Splash from "./page/Splash";
import Task from "./page/Task";
import Admin from "./page/Admin";
// import { isMobileDevice } from './utils/mobileDetect'
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
  const { user, start_param } = useTelegram()
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);
  const [task, setTask] = useState<string[]>([]);
  const [setting, setSetting] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<string>("Splash");
  const [title, setTitle] = useState<string>("");
  const [totalPoint, setTotalPoint] = useState<number>(0.0);
  const [ranking, setRanking] = useState<number>();
  // const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    console.log("In useeffect")
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
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param,
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
              console.log("response.data", response.data);
              const userData = response.data.user;
              if (response.data.signIn) setTab("Exchange");
              setTotalPoint(userData.totalPoints);
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
  }, []);

  return (
    <Router>
      {loading ? (
        <LandingLoader />
      ) : user ? (
        <div
          className={`h-full relative max-h-screen overflow-hidden max-w-[560px] w-full font-roboto`}>
          <div className={`flex h-screen overflow-hidden pb-4 w-full`}>
            {tab == "Splash" && (
              <Splash
                ranking={ranking}
                setTab={setTab}
              />
            )}
            {tab == "Exchange" && (
              <Exchange
                setTab={setTab}
                setTitle={setTitle}
                user={user}
              />
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
