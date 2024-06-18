export default function ProgressBar({ value }: { value: number }) {
  return (
    <>
      <div className="flex flex-row justify-between  px-10 py-1">
        <h5>Platinum</h5>
        <div className="flex">
          <h5>Level</h5>
          <span>
            <h5>&nbsp;4/10</h5>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full h-6 border-[#1E3D4B] border-[1px] rounded-full flex items-center">
          <div
            className="bg-gradient-to-r from-[#EF7300] to-[#711081] h-[14px] rounded-full mx-1"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}