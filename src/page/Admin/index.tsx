import { useState, ChangeEvent } from "react";
import TimeSetting from "./timeSetting";
import TabBar from "./tabBar";
import LevelSetting from "./levelSetting";
import TaskSetting from "./taskSetting";
import PowerSetting from "./powerSetting";
import AdminSetting from "./adminSetting";


export default function ({ setting, setSetting }: { setting: any, setSetting: (value: any) => void }) {
    const [tab, setTab] = useState<string>('default');
    const [userName, setUserName] = useState<string>('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }
    const handleSubmit = () => {
        if (setting.admin.some((admin: any) => admin.username === userName)) {
            setTab('Time');
        }
    }
    return (
        <>
            {
                tab == 'default' ? (
                    <div className="flex flex-row h-full items-center justify-center gap-4">
                        <input
                            type="text" className="h-[40px] w-[220px] px-2 text-white"
                            placeholder="Telegram User Name"
                            name="name"
                            value={userName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                        />
                        <button onClick={handleSubmit} className="actionBtn h-[40px]">
                            Submit
                        </button>
                    </div>
                ) : (
                    <>
                        <TabBar tab={tab} setTab={setTab} />
                        {tab == 'Time' && <TimeSetting setting={setting} setSetting={setSetting} />}
                        {tab == 'Level' && <LevelSetting setting={setting} setSetting={setSetting} />}
                        {tab == 'Task' && <TaskSetting setting={setting} setSetting={setSetting} />}
                        {tab == 'Power' && <PowerSetting setting={setting} setSetting={setSetting} />}
                        {tab == 'Admin' && <AdminSetting setting={setting} setSetting={setSetting} />}
                    </>
                )
            }
        </>
    )
}