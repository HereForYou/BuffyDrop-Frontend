import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ENDPOINT } from "../data";

export default function ({ setting, setSetting, dailyTimeLimit, setDailyTimeLimit }: { setting: any, setSetting: (setting: any) => void, dailyTimeLimit: number, setDailyTimeLimit: (n: number) => void }) {
    const [editRow, setEditRow] = useState<number>(-1);
    const [newDailyLimit, setNewDailyLimit] = useState<string>("0");
    const [editDailyLimit, setEditDailyLimit] = useState<boolean>(false);
    const [settingItem, setSettingItem] = useState<any>({
        level: 1,
        earnPerSecond: "10",
        coinsToLevelUp: "180"
    })

    const handleDailyTimeLimit = (e: ChangeEvent<HTMLInputElement>) => {
        setNewDailyLimit(e.target.value);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setSettingItem({
            ...settingItem,
            level: index + 1,
            [e.target.name]: e.target.value
        });
    }
    const submitSetting = () => {
        let data = {
            level: settingItem.level,
            earnPerSecond: parseInt(settingItem.earnPerSecond, 10),
            coinsToLevelUp: parseInt(settingItem.coinsToLevelUp, 10)
        }
        axios.put(`${ENDPOINT}/api/setting/update/level`, data)
            .then(res => {
                setSetting(res.data);
                setEditRow(-1);
                toast.success("Updated successfully!");
            })
            .catch(err => {
                console.error("Something went wrong.", err);
            })
    }
    const submitDailyTimeLimit = () => {
        axios.put(`${ENDPOINT}/api/setting/update/dailyTimeLimit`, { dailyTimeLimit: parseInt(newDailyLimit, 10) })
            .then(res => {
                setDailyTimeLimit(res.data.dailyTimeLimit);
                setEditDailyLimit(false);
                toast.success("Updated successfully!");
            })
            .catch(err => {
                console.error("Something went wrong.", err);
            })
    }

    return (
        <div className="overflow-y-auto text-black py-[30px] w-full md:w-[320px] md:mx-auto">
            <div className="flex flex-row w-full items-center justify-between gap-2 px-4">
                <h3 className="text-[15px] font-bold">DailyTimeLimit:</h3>
                {
                    editDailyLimit ? (
                        <>
                            <div className="flex flex-row gap-1">
                                <input
                                    type="text" className="h-[30px] w-[40px]"
                                    placeholder="DailyTimeLimit"
                                    name="dailyTimeLimit"
                                    value={newDailyLimit}
                                    onChange={handleDailyTimeLimit}
                                />
                                <button onClick={submitDailyTimeLimit} className="actionBtn">Save</button>
                                <button onClick={() => setEditDailyLimit(false)} className="actionBtn">Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-[15px]">{dailyTimeLimit}</h3>
                            <button onClick={() => {
                                setEditDailyLimit(true);
                                setNewDailyLimit(`${dailyTimeLimit}`);
                            }} className="actionBtn">Edit</button>
                        </>
                    )
                }
            </div>
            <div className="h-[60vh] w-full overflow-y-auto py-2">
                <table className="text-center w-full">
                    <thead>
                        <tr>
                            <td className="text-[15px] font-bold">Level</td>
                            <td className="text-[15px] font-bold">Power</td>
                            <td className="text-[15px] font-bold">LevelUp</td>
                            <td className="text-[15px] font-bold">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            setting.map((item: any, index: number) => (
                                editRow !== index ? (
                                    <tr key={index}>
                                        <td className="text-[13px] font-bold">{item.level}</td>
                                        <td className="text-[13px]">{item.earnPerSecond}</td>
                                        <td className="text-[13px]">{item.coinsToLevelUp}</td>
                                        <td className="text-[13px]">
                                            <button onClick={
                                                () => {
                                                    setEditRow(index);
                                                    setSettingItem({
                                                        level: index + 1,
                                                        earnPerSecond: `${item.earnPerSecond}`,
                                                        coinsToLevelUp: `${item.coinsToLevelUp}`,
                                                    })
                                                }
                                            } className="actionBtn">Edit</button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={index} className="items-center justify-items-center">
                                        <td>{item.level}</td>
                                        <td>
                                            <input
                                                type="text" className="h-[30px] w-[40px]"
                                                placeholder="Power"
                                                name="earnPerSecond"
                                                value={settingItem.earnPerSecond}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="LevelUp"
                                                name="coinsToLevelUp"
                                                value={settingItem.coinsToLevelUp}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                            />
                                        </td>
                                        <td className="flex flex-row gap-1">
                                            <button onClick={submitSetting} className="actionBtn">Save</button>
                                            <button onClick={() => setEditRow(-1)} className="actionBtn">Cancel</button>
                                        </td>
                                    </tr>
                                )

                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}