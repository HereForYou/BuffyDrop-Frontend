export default function ProgressBar({ value }: { value: number }) {
  return (
    <>
      <div className="customCard-container p-[3px] rounded-full flex items-center justify-center w-full">
        <div className="customCard w-full rounded-full hover:translate-y-0 h-2 flex items-center p-0">
          <div
            className="bg-gradient-to-r from-[#EF7300] to-[#711081] h-2 rounded-full"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}