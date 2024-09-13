import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import Loader from "../component/Loader";
import { ENDPOINT } from "../data";
import { formatNumberWithCommas } from "../utils/functions";

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
      // axios.get(`${ENDPOINT}/api/user/all/${user.id}`)
      axios.get(`${ENDPOINT}/api/user/top/${user.id}?num=100`)
      .then((res) => {
          let userInfo = res.data;
          setUsers(userInfo.topUsers);
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

  return (
    <div className="h-full flex flex-col text-center items-center justify-between py-2 px-6">
      <div className="w-full">
        {/* <div className="customCard-container w-full"> */}
          <div className="group pt-6 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]">
            {/* <h2 className="text-[24px] font-extrabold">Top {users.length} $BLEGGS Miners</h2> */}
            <h2 className="text-2xl text-[#acacac] font-extrabold">Telegram Wall of Fame</h2>
          </div >
        {/* </div > */}
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader width="30" />
          </div>
        ) : (
          <div className={`flex my-3 px-3 py-1 items-center text-[#acacac] bg-[#110d33] rounded-lg w-full`}>
            <div className="relative h-10 w-10 overflow-hidden flex items-center">
              <img src="/logo.png" alt="avatar" className="w-7 h-7 rounded-full bg-white" />
            </div>
            <div className="w-full">
              <p className="text-xs text-start pl-2">{curUser?.userName}</p>
              <p className="text-[8px] text-start pl-2">
                {formatNumberWithCommas(curUser?.totalPoints.toFixed(2))+" BUFFYS"}
              </p>
            </div>
            <div className="text-xs text-center flex justify-center w-[15%]">
                    {
                      ((ranking + 1) == 1 || (ranking + 1) == 2 || (ranking + 1) == 3) ?
                      <img
                        src={`/rank_${ranking + 1}.png`}
                        alt="rank"
                        className="w-4 h-6"
                      />:
                      "#" + (ranking + 1)
                    }
                    </div>
          </div>
        )}
        {
          loading ? (
            <div className="w-full flex items-center justify-center">
              <Loader width="30" />
            </div>
          ) : (
            <div>
              <div className="flex pt-3 pb-1 text-base w-full text-[#acacac] items-center">
                <div className="text-center pl-2">46M</div>
                <div className="text-center pl-2">holders</div>
              </div>
              <div className="h-[62vh] overflow-auto w-full">
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}
                  >
                    <div className="relative h-10 overflow-hidden w-[100%] flex items-center">
                      <img
                        src="/logo.png"
                        alt="avatar"
                        className="w-7 h-7 rounded-full bg-white"
                      />
                      <div className="pl-4 text-start">
                        <p className="text-xs">{iUser?.userName}</p>
                        <p className="text-[8px]">
                          {formatNumberWithCommas(iUser?.totalPoints.toFixed(2))+" BUFFYS"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center flex justify-center w-[15%]">
                      {
                        ((index + 1) == 1 || (index + 1) == 2 || (index + 1) == 3) ?
                        <img
                          src={`/rank_${index + 1}.png`}
                          alt="rank"
                          className="w-4 h-6"
                        />:
                        "#" + (index + 1)
                      }
                      </div>
                  </div>
                ))}
                {/* ------------------------------------------------------------------ */}
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}
                  >
                    <div className="relative h-10 overflow-hidden w-[100%] flex items-center">
                      <img
                        src="/logo.png"
                        alt="avatar"
                        className="w-7 h-7 rounded-full bg-white"
                      />
                      <div className="pl-4 text-start">
                        <p className="text-xs">{iUser?.userName}</p>
                        <p className="text-[8px]">
                          {formatNumberWithCommas(iUser?.totalPoints.toFixed(2))+" BUFFYS"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center flex justify-center w-[15%]">
                      {
                        ((index +2) == 1 || (index +2) == 2 || (index +2) == 3) ?
                        <img
                          src={`/rank_${index +2}.png`}
                          alt="rank"
                          className="w-4 h-6"
                        />:
                        "#" + (index +2)
                      }
                      </div>
                  </div>
                ))}
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}
                  >
                    <div className="relative h-10 overflow-hidden w-[100%] flex items-center">
                      <img
                        src="/logo.png"
                        alt="avatar"
                        className="w-7 h-7 rounded-full bg-white"
                      />
                      <div className="pl-4 text-start">
                        <p className="text-xs">{iUser?.userName}</p>
                        <p className="text-[8px]">
                          {formatNumberWithCommas(iUser?.totalPoints.toFixed(2))+" BUFFYS"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center flex justify-center w-[15%]">
                      {
                        ((index +3) == 1 || (index +3) == 2 || (index +3) == 3) ?
                        <img
                          src={`/rank_${index +3}.png`}
                          alt="rank"
                          className="w-4 h-6"
                        />:
                        "#" + (index +3)
                      }
                      </div>
                  </div>
                ))}
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}
                  >
                    <div className="relative h-10 overflow-hidden w-[100%] flex items-center">
                      <img
                        src="/logo.png"
                        alt="avatar"
                        className="w-7 h-7 rounded-full bg-white"
                      />
                      <div className="pl-4 text-start">
                        <p className="text-xs">{iUser?.userName}</p>
                        <p className="text-[8px]">
                          {formatNumberWithCommas(iUser?.totalPoints.toFixed(2))+" BUFFYS"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center flex justify-center w-[15%]">
                      {
                        ((index +4) == 1 || (index +4) == 2 || (index +4) == 3) ?
                        <img
                          src={`/rank_${index +4}.png`}
                          alt="rank"
                          className="w-4 h-6"
                        />:
                        "#" + (index +4)
                      }
                      </div>
                  </div>
                ))}
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}
                  >
                    <div className="relative h-10 overflow-hidden w-[100%] flex items-center">
                      <img
                        src="/logo.png"
                        alt="avatar"
                        className="w-7 h-7 rounded-full bg-white"
                      />
                      <div className="pl-4 text-start">
                        <p className="text-xs">{iUser?.userName}</p>
                        <p className="text-[8px]">
                          {formatNumberWithCommas(iUser?.totalPoints.toFixed(2))+" BUFFYS"}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center flex justify-center w-[15%]">
                      {
                        ((index +5) == 1 || (index +5) == 2 || (index +5) == 3) ?
                        <img
                          src={`/rank_${index +5}.png`}
                          alt="rank"
                          className="w-4 h-6"
                        />:
                        "#" + (index +5)
                      }
                      </div>
                  </div>
                ))}
                {/* ------------------------------------------------------------------ */}
              </div>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Leaderboard;