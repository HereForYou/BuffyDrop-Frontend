import { ToastContainer } from "react-toastify";
import AnalysisCard from "../component/section/AnalysisCard";
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
      <div className="h-full w-full flex flex-col text-center items-center justify-start py-2">
        <div className="flex flex-row w-full items-center justify-center gap-4 text-[16px] font-extrabold">
          <div className="customCard-container w-[55%]">
            <div className="customCard group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <h2 className="text-[16px]">Difficulties will<br />increase in</h2>
            </div>
          </div>
          <div className="customCard-container w-[45%]">
            <div className="customCard group w-full py-4 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3]">
              <h2 className="text-[16px]">Mining<br />Power</h2>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </>
  );
}

export default Mine;
