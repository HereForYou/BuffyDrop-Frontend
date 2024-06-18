import { useState } from "react";
import { mockData } from "../mock";
export default function RankingList() {
  const [user] = useState({
    ranking: 200,
    name: "EKans",
    $GoXP: 1000000,
  });
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  return (
    <div className="md:w-full h-[65vh] mx-auto ">
      <div className="max-h-[50vh] max-sm:max-h-[50vh] overflow-auto">
        <div className="flex px-3 py-1  text-lg font-bold justify-center align-middle overflow-y-hidden">
          <div className="text-start w-[20%] flex justify-center">Rank</div>
          <div className="text-start w-[55%] flex justify-center">User</div>
          <div className="text-start w-[20%] flex justify-center">$Mike</div>
        </div>
        {mockData.map((data, index) => (
          <div
            key={index}
            className={`flex ${
              index > 0 && "my-3"
            } px-3 py-2 items-center bg-[#363636] rounded-lg`}
          >
            <div className="text-xl text-start pl-2 w-[20%]  flex justify-center align-middle">
              {index == 0 ? (
                <img src="image/crown.png" alt="" width={30} height={30} />
              ) : index == 1 ? (
                <img src="image/trophy.png" alt="" width={30} height={30} />
              ) : index == 2 ? (
                <img src="image/star.png" alt="" width={30} height={30} />
              ) : (
                index + 1
              )}
            </div>
            <div className="relative h-10 overflow-hidden w-[60%] flex items-center justify-center">
              <img src="/image/mikeT.png" alt="avatar" className="w-10 h-10" />
              <p className="text-xl text-start pl-2 ">{data.name}</p>
            </div>

            <p className="text-xl text-start pl-2 w-[30%] ">
              {formatNumberWithCommas(data.$GoXP)}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-3 border-[#363636] border-2" />
      <div
        className={`flex my-3 px-3 py-2 items-center bg-[#5A4C3B] rounded-lg`}
      >
        <div className="text-xl text-start pl-2 w-[20%] ">
          {user.ranking}
        </div>
        <div className="relative h-12 overflow-hidden w-[60%] flex items-center">
          <img src="/image/mikeT.png" alt="avatar" className="w-10 h-10" />
          <p className="text-xl text-start pl-2 ">{user.name}</p>
        </div>

        <p className="text-xl text-start pl-2 w-[30%] ">
          {formatNumberWithCommas(user.$GoXP)}
        </p>
      </div>
    </div>
  );
}
