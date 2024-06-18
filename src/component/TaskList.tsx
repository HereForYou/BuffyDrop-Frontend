import { mockQuest } from "../mock";
export default function TaskList() {
  return (
    <div className="max-h-[50vh] max-sm:max-h-[50vh] overflow-auto">
      {mockQuest.map((data, index) => (
        <div
          key={index}
          className="flex items-center h-36 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] rounded-lg"
        >
          <div className="flex items-center justify-start ">
            {data.name}
          </div>
        </div>
      ))}
    </div>
  );
}
