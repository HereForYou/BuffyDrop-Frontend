interface IFooterProps {
    tab: string;
    setTab: (status: string) => void;
}
const tabs = [
    {
        id: "Time",
        name: "Time",
        img: "time.svg"
    },
    {
        id: "Power",
        name: "Power",
        img: "rocket.svg"
    },
    {
        id: "Level",
        name: "Level",
        img: "badge.svg"
    },
    {
        id: "Task",
        name: "Task",
        img: "task.svg"
    },
    {
        id: "Dex",
        name: "Dex",
        img: "exchange.svg"
    },
    {
        id: "Admin",
        name: "Admin",
        img: "admin.svg"
    },
]
const TabBar: React.FC<IFooterProps> = ({ tab, setTab }) => {
    const handleClick = (tab: string) => {
        setTab(tab);
    }
    return (
        <div className="footer grid grid-cols-6 justify-between absolute z-10 h-[60px] w-full bottom-0 right-0 items-center px-4 rounded-2xl">
            {
                tabs.map((item, index) => (
                    <div key={index} onClick={() => handleClick(item.id)} className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition 
              ${item.id === tab
                            ? "scale-[110%]"
                            : "opacity-60"
                        }`}>
                        <div className={`flex flex-col items-center justify-center font-extrabold ${item.id === tab && 'border-b-2 border-[#fff]'} gap-1`}>
                            <img
                                src={item.img}
                                loading='lazy'
                                alt="play"
                                className="w-5 h-5"
                            />
                            <h3 className="text-[10px]">{item.name}</h3>
                        </div>
                    </div>
                ))
            }
        </div >
    );
}
export default TabBar;