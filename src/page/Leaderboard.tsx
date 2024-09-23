import axios from "axios";
import React, { useEffect, useState, useRef, useMemo } from "react";
// import { toast } from "react-hot-toast";
import Loader from "../component/Loader";
import { ENDPOINT } from "../data";
import { formatNumberWithCommas } from "../utils/functions";

interface ILeaderboardProps {
  user: any;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ user }) => {
  const [users, setUsers] = useState<object[]>([]);
  const [curUser, setCurUser] = useState<any>({});
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [ranking, setRaking] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    // Check if we've reached the bottom
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setPage((prev) => prev + 1);
      console.log("Scrolled to the bottom!");
      // You can perform any action here, like loading more content
    }
  };

  useEffect(() => {
    getTopUsers(page);
  }, [page]);

  const getTopUsers = async (page: number) => {
    setLoading(true);
    if (user) {
      try {
        const { data } = await axios.get(
          `${ENDPOINT}/api/user/top/${user.id}?page=${page}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true", // or any value you prefer
            },
          }
        );
        console.log("loading data > ", data);
        setUsers((prev) => [...prev, ...data.topUsers]);
        setTotalUsersCount(data.totalMembers);
        setCurUser(data.curUser);
        setRaking(data.ranking);
        setLoading(false);
      } catch (err) {
        console.log("An error occurs while retrieving the top users.", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const formattedUserCount = useMemo(() => {
    if (totalUsersCount > 1000000) {
      return Math.round(totalUsersCount / 1000000) + "M";
    } else if (totalUsersCount > 1000) {
      return Math.round(totalUsersCount / 1000) + "K";
    }
    return totalUsersCount;
  }, [totalUsersCount]);

  return (
    <div className='h-[calc(100%-40px)] w-full flex flex-col text-center items-center justify-between py-2 px-6 overflow-x-hidden overflow-y-auto hiddenScrollBar text-white'>
      <div className='w-full'>
        {/* <div className="customCard-container w-full"> */}
        <div className='group pt-6 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3]'>
          {/* <h2 className="text-[24px] font-extrabold">Top {users.length} $BuffyDrop Miners</h2> */}
          <h2 className='text-3xl font-extrabold pt-4'>
            Telegram Wall of Fame
          </h2>
        </div>
        {/* </div > */}
        {loading ? (
          <div className='w-full flex items-center justify-center'>
            <Loader width='30' />
          </div>
        ) : (
          <div>
            <div
              className={`flex my-3 px-3 py-2 items-center text-[#acacac] bg-[#110d33] rounded-lg w-full`}>
              <div className='w-full flex flex-row gap-1 items-center'>
                <div
                  className={`h-8 w-8 rounded-full text-center flex justify-center items-center ${
                    curUser?.style ?? "bg-orange-600 text-white"
                  }`}>
                  {curUser?.userName.substring(0, 2).toUpperCase()}
                </div>
                <div className='flex flex-col'>
                  <p className='text-xs text-white text-start pl-2'>
                    {curUser?.userName}
                  </p>
                  <p className='text-[8px] text-start pl-2'>
                    {formatNumberWithCommas(curUser?.totalPoints) + " BUFFY"}
                  </p>
                </div>
              </div>
              <div className='text-xs text-center flex justify-center w-[15%]'>
                {ranking + 1 == 1 || ranking + 1 == 2 || ranking + 1 == 3 ? (
                  <img
                    src={`/rank_${ranking + 1}.webp`}
                    loading='lazy'
                    alt='rank'
                    className='w-4 h-6'
                  />
                ) : (
                  "#" + (ranking + 1)
                )}
              </div>
            </div>
            <div>
              <div className='flex pt-3 pb-1 text-2xl font-bold w-full items-center'>
                <div className='text-center pl-2'>{formattedUserCount}</div>
                <div className='text-center pl-2'>holders</div>
              </div>
              <div
                className='h-[62vh] overflow-auto w-full'
                ref={scrollRef}
                onScroll={handleScroll}>
                {users?.map((iUser: any, index) => (
                  <div
                    key={index}
                    className={`flex px-2 py-1 items-center text-[#acacac] w-full`}>
                    <div className='relative h-10 overflow-hidden w-[100%] flex items-center'>
                      <div
                        className={`h-8 w-8 rounded-full text-center flex justify-center items-center ${
                          iUser?.style ?? "bg-white text-black"
                        }`}>
                        {iUser?.userName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className='pl-4 text-start'>
                        <p className='text-xs text-white'>{iUser?.userName}</p>
                        <p className='text-[8px]'>
                          {formatNumberWithCommas(iUser?.totalPoints) +
                            " BUFFY"}
                        </p>
                      </div>
                    </div>
                    <div className='text-xs text-center flex justify-center w-[15%]'>
                      {index + 1 == 1 || index + 1 == 2 || index + 1 == 3 ? (
                        <img
                          src={`/rank_${index + 1}.webp`}
                          alt='rank'
                          loading='lazy'
                          className='w-4 h-6'
                        />
                      ) : (
                        "#" + (index + 1)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
