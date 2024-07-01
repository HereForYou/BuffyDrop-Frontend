function Mine() {
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
    </>
  );
}

export default Mine;
