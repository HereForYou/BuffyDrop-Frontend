import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Loader from "../component/Loader";
import { ENDPOINT } from "../data";

interface ILeaderboardProps {
  user: any;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ user }) => {
  const [users, setUsers] = useState<object[]>([]);
  const [curUser, setCurUser] = useState<any>({});
  const [ranking, setRaking] = useState<number>(0);
  const hasShownWarningRef = useRef(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!hasShownWarningRef.current && user) {
      setLoading(true);
      axios.get(`${ENDPOINT}/api/user/all/${user.id}`)
        .then((res) => {
          let userInfo = res.data;
          setUsers(userInfo.allUsers);
          setCurUser(userInfo.curUser);
          setRaking(userInfo.ranking);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something Went Wrong!");
        })
      hasShownWarningRef.current = true;
    }
  }, [])

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  return (
    <div className="h-full flex flex-col text-center items-center justify-between py-2">
      <div className="customCard-container w-full">
        <div className="customCard group py-4 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]">
          <h2 className="text-[24px] font-extrabold">{users.length} $BLEGGS Miners</h2>
        </div >
      </div >
      <div className="flex px-3 text-lg w-full text-[#2ea6d9f0] items-center justify-between">
        <div className="text-center w-[20%]">Rank</div>
        <div className="text-center w-[60%]">User</div>
        <div className="text-center w-[30%]">$BLEGGS</div>
      </div>
      {
        loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader width="30" />
          </div>
        ) : (
          <div className="h-[65vh] overflow-auto w-full">
            {users.map((iUser: any, index) => (
              <div
                key={index}
                className={`flex px-3 py-1 items-center bg-[#FFD798] w-full`}
              >
                <div className="text-lg text-center pl-2 w-[20%]">{index + 1}</div>
                <div className="relative h-10 overflow-hidden w-[60%] flex items-center">
                  <img
                    src="/logo.png"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-medium text-start pl-2">{iUser.userName}</p>
                </div>

                <p className="text-medium pl-2 w-[30%] text-center">
                  {formatNumberWithCommas(iUser.totalPoints)}
                </p>
              </div>
            ))}
          </div>

        )
      }
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader width="30" />
        </div>
      ) : (
        <div className={`flex px-3 py-2 items-center bg-[#FFD798] rounded-lg w-full`}>
          <div className="text-lg text-center pl-2 w-[20%]">{ranking + 1}</div>
          <div className="relative h-10 overflow-hidden w-[60%] flex items-center">
            <img src="/logo.png" alt="avatar" className="w-10 h-10 rounded-full" />
            <p className="text-lg text-start pl-2">{curUser.userName}</p>
          </div>
          <p className="text-lg text-center pl-2 w-[30%]">
            {formatNumberWithCommas(curUser.totalPoints)}
          </p>
        </div>
      )}
    </div>
  )
}

export default Leaderboard;