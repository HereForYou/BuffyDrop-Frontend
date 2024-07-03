import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import EarnCard from "../component/EarnCard";

const Tasks = [
  {
    id: "telegram",
    title: "Join our TG channel",
    image: "telegram.svg",
    profit: 1000,
    flag: true,
    link: "https://t.me/bleggs"
  },
  {
    id: "youtube",
    title: "Get Exclusive listing info",
    image: "youtube.svg",
    profit: 1000,
    flag: false,
    link: "https://t.me/bleggs"
  },
  {
    id: "twitter",
    title: "Follow your X account",
    image: "twitter.svg",
    profit: 1000,
    flag: true,
    link: "https://t.me/bleggs"
  },
  {
    id: "Choose",
    title: "Choose",
    image: "choose.svg",
    profit: 1000,
    flag: true,
    link: "https://t.me/bleggs"
  },
];
import { ENDPOINT } from "../data";

interface ITaskProps {
  user: any;
  totalPoint: number;
  setTotalPoint: (status: number) => void;
  task: string[];
  setTask: (status: string[]) => void;
}

const Task: React.FC<ITaskProps> = ({ user, totalPoint, setTotalPoint, task, setTask }) => {

  const handleFollow = (link: any, id: any, profit: any) => {
    if (id == "dailyTask") {
      axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
        id,
        profit
      })
        .then(res => {
          if (res.data) {
            let newPoints = totalPoint + profit;
            setTotalPoint(newPoints);
            setTask([...task, id]);
            toast.success("Congratulation! You just earned 100 POINTS");
          }
        })
        .catch(err => {
          console.error("er", err);
        }
        )
    }
    else if (id == "telegram" || id == "website") {
      axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
        id,
        profit
      })
        .then(res => {
          if (res.data) {
            let newPoints = totalPoint + profit;
            setTotalPoint(newPoints);
            setTask([...task, id]);
            toast.success("Congratulation! You just earned 100 POINTS");
          }
        })
        .catch(err => {
          console.error("er", err);
        }
        )
      window.open(link, '_blank');
    }
    else {
      window.open(link, '_blank');
      //axios
      setTimeout(() => {
        axios.put(`${ENDPOINT}/api/user/task/${user?.id}`, {
          id,
          profit
        })
          .then(res => {
            if (res.data) {
              let newPoints = totalPoint + profit;
              setTotalPoint(newPoints);
              setTask([...task, id]);
              toast.success("Congratulation! You just earned 100 POINTS");
            }
          })
          .catch(err => {
            console.error("er", err);
          }
          )
      }, 5000);
    }
  }

  return (
    <div className="pb-[40px]">
      <p className="lilita text-3xl font-bold p-4 text-white">Earn More $BLEGGS</p>
      <p className="lilita text-xl font-bold text-left text-white">Daily tasks</p>
      <div className="py-2">
        {/* <EarnCard
          title="Daily rewoard"
          image="gift.svg"
          profit={1000}
          flag={true}
        /> */}
        {task.includes('dailyTask') ? (
          <div className="customCard-container grid grid-col-1 grid-col-1 w-full">
            <div className="customCard group p-2 transition relative duration-300 cursor-pointer hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
              <div className="flex grid-cols-2 gap-3 w-full">
                <div className="my-auto w-14">
                  <img src="gift.svg" alt="icon" className="w-8 aspect-square" />
                </div>
                <div className="flex flex-row w-full justify-between">
                  <div className="space-y-2">
                    <p className="text-[14px] font-semibold text-left">
                      Daily rewoard
                    </p>
                    <div className="flex items-center">
                      <img src="dollar.png" alt="" className="w-4 h-4" />
                      <p className="text-[13px] ml-1 font-bold">+1000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src="check.svg" alt="" className="w-6 h-6 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => handleFollow('none', 'dailyTask', 1000)} className="customCard-container grid grid-col-1 grid-col-1 w-full">
            <div className="customCard group p-2 transition relative duration-300 cursor-pointer hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
              <div className="flex grid-cols-2 gap-3 w-full">
                <div className="my-auto w-14">
                  <img src="gift.svg" alt="icon" className="w-8 aspect-square" />
                </div>
                <div className="flex flex-row w-full justify-between">
                  <div className="space-y-2">
                    <p className="text-[14px] font-semibold text-left">
                      Daily rewoard
                    </p>
                    <div className="flex items-center">
                      <img src="dollar.png" alt="" className="w-4 h-4" />
                      <p className="text-[13px] ml-1 font-bold">+1000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src="uncheck.svg" alt="" className="w-6 h-6 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-center pb-2">
        <p className="lilita text-white text-left text-xl font-semibold">
          Tasks List
        </p>
      </div>
      <div className="space-y-2 max-h-[260px] overflow-y-auto">
        {
          Tasks.map((item) => (
            task.includes(item.id) ? (
              <div key={item.id} className="customCard-container grid grid-col-1 grid-col-1 w-full">
                <div className="customCard group p-2 transition relative duration-300 cursor-pointer hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
                  <div className="flex grid-cols-2 gap-3 w-full">
                    <div className="my-auto w-14">
                      <img src={item.image} alt="icon" className="w-8 aspect-square" />
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="space-y-2">
                        <p className="text-[14px] font-semibold text-left">
                          {item.title}
                        </p>
                        <div className="flex items-center">
                          <img src="dollar.png" alt="" className="w-4 h-4" />
                          <p className="text-[13px] ml-1 font-bold">+{item.profit}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <img src="check.svg" alt="" className="w-6 h-6 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={() => handleFollow(item.link, item.id, item.profit)} key={item.id} className="customCard-container grid grid-col-1 grid-col-1 w-full">
                <div className="customCard group p-2 transition relative duration-300 cursor-pointer hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
                  <div className="flex grid-cols-2 gap-3 w-full">
                    <div className="my-auto w-14">
                      <img src={item.image} alt="icon" className="w-8 aspect-square" />
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="space-y-2">
                        <p className="text-[14px] font-semibold text-left">
                          {item.title}
                        </p>
                        <div className="flex items-center">
                          <img src="dollar.png" alt="" className="w-4 h-4" />
                          <p className="text-[13px] ml-1 font-bold">+{item.profit}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <img src="uncheck.svg" alt="" className="w-6 h-6 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )

          ))
        }
      </div>
    </div>
  );
};
export default Task;
