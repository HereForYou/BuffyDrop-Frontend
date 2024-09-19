import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { ENDPOINT } from "../data";
import { formatNumberWithCommas } from "../utils/functions";
import Loader from "../component/Loader";

interface ITaskProps {
  user: any;
  totalPoint: number;
  setTotalPoint: (status: number) => void;
  task: string[];
  setTask: (status: string[]) => void;
  setting: any;
  title: string;
}

const Task: React.FC<ITaskProps> = ({
  user,
  totalPoint,
  setTotalPoint,
  task,
  setTask,
  setting,
  title,
}) => {
  console.log("---> setting --->", setting, "---> task --->", task);
  const [isLoading, setIsLoading] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(5);
  const [tracking, setTracking] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>({});

  const handleMouseEvent = () => {
    if (tracking) {
      setCount((prevCount) => prevCount + 1);
      let c = count;
      console.log("This is count", c);
    }
  };

  const startTracking = () => {
    setTracking(true);
    setCount(0); // Reset count when starting to track    https://v0.dev/chat
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      console.log("Time's up!", count, "currentItem", currentItem);
      setTracking(false);
      setTimeRemaining(5);
      if (currentItem.id == "telegram") {
        console.log("Telegram request is sent", currentItem.id, " ", count);
        try {
          axios
            .post(`${ENDPOINT}/api/user/joinTG/${user?.id}`)
            .then((res) => {
              console.log("this is response", res.data.status);
              if (res.data.status) {
                console.log("After the validation whether I join in or not.");
                axios
                  .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
                    id: currentItem.id,
                    profit: currentItem.profit,
                  })
                  .then((res) => {
                    if (res.data) {
                      let newPoints = totalPoint + currentItem.profit;
                      setTotalPoint(newPoints);
                      setTask([...task, currentItem.id]);
                      toast.success(`+${currentItem.profit} $GS!`);
                    }
                  })
                  .catch((err) => {
                    console.error("er", err);
                  });
              }
            })
            .catch((err) => {
              console.error("er", err);
            });
        } catch (err) {
          console.log("err", err);
        }
      }
      if (count == 1 && currentItem.id != "telegram") {
        console.log(
          "There is no event while 5 seconds",
          count,
          "   ",
          currentItem
        );
        setTimeout(() => {
          axios
            .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
              id: currentItem.id,
              profit: currentItem.profit,
            })
            .then((res) => {
              if (res.data) {
                let newPoints = totalPoint + currentItem.profit;
                setTotalPoint(newPoints);
                setTask([...task, currentItem.id]);
                toast.success(`+${currentItem.profit} $Buffy!`);
              }
            })
            .catch((err) => {
              console.error("err", err);
            });
        }, 300);
      }
      setIsLoading("");
    }
  }, [timeRemaining]);

  useEffect(() => {
    let interval: any;

    if (tracking) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      window.addEventListener("click", handleMouseEvent);
      window.addEventListener("mousemove", handleMouseEvent);
      window.addEventListener("keydown", handleMouseEvent); // Optional: Count key presses as well
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleMouseEvent);
      window.removeEventListener("mousemove", handleMouseEvent);
      window.removeEventListener("keydown", handleMouseEvent);
    };
  }, [tracking]);

  const handleFollow = (item: any) => {
    setIsLoading(item.id);
    console.log("handleFollow button is clicked!", item);
    if (item.id == "dailyTask") {
      axios
        .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
          id: item.id,
          profit: item.profit,
        })
        .then((res) => {
          if (res.data) {
            let newPoints = totalPoint + item.profit;
            setTotalPoint(newPoints);
            setTask([...task, item.id]);
            toast.success(`+${item.profit} $Buffy!`);
          }
        })
        .catch((err) => {
          console.error("er", err);
        });
    } else if (item.id == "telegram") {
      //====================== if you join telegram channel
      window.open(item.link, "_blank");
      setCurrentItem(item);
      startTracking();
    } else {
      window.open(item.link, "_blank");
      // window.open("https://v0.dev/chat", "_blank");
      setCurrentItem(item);
      startTracking();
    }
  };
  const handleVisit = (link: any) => {
    window.open(link, "_blank");
  };
  const handleItemClick = (item: any) => {
    console.log("handleItemClick button is clicked!", item);
    if (task.includes(item.id)) {
      handleVisit(item.link);
    } else {
      handleFollow(item);
    }
  };
  return (
    <div className='w-full h-[calc(100%-40px)] overflow-x-hidden overflow-y-auto hiddenScrollBar'>
      <div className='flex flex-col justify-center items-center text-xl text-[#acacac] font-bold pt-16 pb-6'>
        <img
          src={`${title != "DAILY REWARD" ? "/comm.webp" : "/daily.webp"}`}
          alt=''
          className='min-w-24 w-[15vw] pb-4'
          loading='lazy'
        />
        <div className='text-3xl text-white'>{title}</div>
      </div>
      <div className='px-6'>
        {setting?.taskList.map(
          (item: any) => (
            <button
              onClick={() => handleItemClick(item)}
              key={item.id}
              disabled={tracking}
              className='flex w-full justify-between items-center rounded-lg px-3 py-2 cursor-pointer my-2 text-sm bg-[#110d33]'>
              <div className='flex flex-row gap-1 items-center text-[#acacac]'>
                <img
                  src={`${item.image ? item.image : "choose.svg"}`}
                  loading='lazy'
                  alt='icon'
                  className='w-10 aspect-square'
                />
                <div className='flex flex-col pl-2 gap-0.5'>
                  <div className='flex flex-col'>{item.title}</div>
                  <div className='flex flex-row items-center'>
                    <img
                      src='buffy_icon.webp'
                      alt=''
                      className='w-4 h-4'
                      loading='lazy'
                    />
                    <div className='pl-1'>
                      +{formatNumberWithCommas(item.profit)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[10%] flex justify-center'>
                {isLoading === item.id ? (
                  <Loader width='20' />
                ) : (
                  <img
                    src={`${
                      task.includes(item.id)
                        ? "/check_green.webp"
                        : "/next_icon.webp"
                    }`}
                    alt=''
                    className={`${
                      task.includes(item.id) ? "w-6 h-6" : "w-2 h-3"
                    }`}
                    loading='lazy'
                  />
                )}
              </div>
            </button>
          )
          // )
        )}
      </div>
    </div>
  );
};
export default Task;
