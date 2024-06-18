import { ToastContainer } from "react-toastify";
import AnaylsisCard from "../component/section/AnalysisCard";
import DailyCard from "../component/DailyCard";
import TimeText from "../component/TimeText";
import "react-toastify/dist/ReactToastify.css";
import ComboCard from "../component/ComboCard";
import Markets from "../component/section/Markets";
import { useState } from "react";

const subTabs = [
  {
    name: "Markets"
  },
  {
    name: "PR&Team"
  },
  {
    name: "Legal"
  },
  {
    name: "Specials"
  }
];

function Mine() {
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const [tab, setTab] = useState<string>("Markets");
  return (
    <>
      <div className="h-full flex flex-col text-center items-center justify-start py-[40px]">
        <AnaylsisCard />
        <div className="pb-[84px]">
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="flex flex-row justify-center items-center mt-4">
              <img src="/image/dollar.png" alt="" className="w-14 h-14 mt-1" />
              <h1 className="text-5xl  ml-3 font-bold">
                {formatNumberWithCommas(680432)}
              </h1>
            </div>
            <TimeText />
            <DailyCard />
            <div className="grid grid-cols-3 w-full pt-4 gap-2">
              <ComboCard image="/image/com_3.png" content="Top 10 pairs" />
              <ComboCard image="/image/mikeT.png" content="Security Audition" />
              <ComboCard image="/image/com_1.png" content="Licence Ethiopia" />
            </div>
          </div>
          <div className="flex flex-row bg-white gap-2 md:gap-10 justify-between px-2 p-1 pt-2 items-center rounded-xl w-full sticky z-50 border-2 mt-2">
            {
              subTabs.map((subTab, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transform origin-bottom transition ${subTab.name === tab
                    && "scale-[110%] text-white bg-[#2862e0] p-2 max-sm:p-1 rounded-lg"}`}
                  onClick={() => setTab(subTab.name)}
                >
                  <p className="text-sm ">{subTab.name}</p>
                </div>
              ))
            }
          </div>
          <div className="w-full">{tab === "Markets" && <Markets />}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Mine;
