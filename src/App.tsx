import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Exchange from "./page/Exchange";
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
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<string>('Exchange');
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-full max-h-screen overflow-hidden md:w-[30%] py-2">
          <div className="h-screen overflow-auto pb-[84px] px-4 dM-Sans bg-[white]">
            {
              tab == 'Exchange' && <Exchange setTab={setTab} />
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
