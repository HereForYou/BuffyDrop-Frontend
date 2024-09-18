import { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faPlus, faXmark, faPencil, faTrashCan, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINT } from "../../data";

const timeSetting = ({ setting, setSetting }: { setting: any, setSetting: (value: any) => void }) => {
    const [editRow, setEditRow] = useState<number>(-1);
    const [addMode, setAddMode] = useState<boolean>(false);

    const [settingItem, setSettingItem] = useState<any>({
        id: 1,
        value: 0,
        coinsToBoost: 0
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setSettingItem({
            ...settingItem,
            id: index + 1,
            [e.target.name]: e.target.value
        });
    }

    const handleDelete = (index: number) => {
        let isSure = window.confirm('You really want to delete this one?');
        if (isSure) {
            axios.delete(`${ENDPOINT}/api/setting/delete/timeLimit/${index}`)
                .then(res => {
                    setSetting(res.data);
                    setEditRow(-1);
                    toast.success("Updated successfully!");
                })
                .catch(err => {
                    console.error("Something went wrong.", err);
                })
        }
    }

    const submitSetting = () => {
        let data = {
            id: parseInt(settingItem.id, 10),
            value: parseFloat(settingItem.value),
            coinsToBoost: parseFloat(settingItem.coinsToBoost)
        }
        axios.put(`${ENDPOINT}/api/setting/update/timeLimit/${editRow}`, data)
            .then(res => {
                setSetting(res.data);
                setEditRow(-1);
                toast.success("Updated successfully!");
            })
            .catch(err => {
                console.error("Something went wrong.", err);
            })
    }
    return (
        <>
            <div className="overflow-y-auto text-white py-8 w-full">
                <div className="h-[60vh] w-full overflow-y-auto py-2">
                    <table className="text-center w-full">
                        <thead>
                            <tr>
                                <td className="text-[15px] font-bold">No</td>
                                <td className="text-[15px] font-bold">Value(Min)</td>
                                <td className="text-[15px] font-bold">CoinsToBoost</td>
                                <td className="text-[15px] font-bold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setting?.dailyTimeLimitList.map((item: any, index: number) => (
                                    editRow !== index ? (
                                        <tr key={index}>
                                            <td className="text-[13px] font-bold w-[10%] md:w-[25%]">{index + 1}</td>
                                            <td className="text-[13px] font-bold w-[25%]">{item.value}</td>
                                            <td className="text-[13px] w-[25%]">{item.coinsToBoost}</td>
                                            <td className="text-[13px] w-[25%] space-x-4">
                                                <button onClick={
                                                    () => {
                                                        setEditRow(index);
                                                        setAddMode(false);
                                                        setSettingItem({
                                                            value: `${item.value}`,
                                                            coinsToBoost: `${item.coinsToBoost}`,
                                                        })
                                                    }
                                                } className="actionBtn">
                                                    <FontAwesomeIcon icon={faPencil} className="mr-1" />
                                                    {/* <h3 className="hidden md:flex">
                                                        Edit
                                                    </h3> */}
                                                </button>
                                                <button onClick={
                                                    () => {
                                                        setAddMode(false);
                                                        handleDelete(index);
                                                    }
                                                } className="actionBtn">
                                                    <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                                                    {/* <h3 className="hidden md:flex">
                                                        Delete
                                                    </h3> */}
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={index} className="">
                                            <td className="text-[13px] font-bold w-[10%] md:w-[25%]">{index + 1}</td>
                                            <td className="text-[13px] font-bold w-[25%]">
                                                <input
                                                    type="text" className="h-[30px] w-[60px]"
                                                    placeholder="Minute"
                                                    name="value"
                                                    value={settingItem.value}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                                />
                                            </td>
                                            <td className="text-[13px] font-bold w-[25%]">
                                                <input
                                                    type="text" className="h-[30px] w-[60px]"
                                                    placeholder="Coins To Boost"
                                                    name="coinsToBoost"
                                                    value={settingItem.coinsToBoost}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                                />
                                            </td>
                                            <td className="text-[13px] w-[25%] space-x-4">
                                                <button onClick={submitSetting} className="actionBtn">
                                                    <FontAwesomeIcon icon={faSave} className="mr-1" />
                                                    {/* <h3 className="hidden md:flex">
                                                        Save
                                                    </h3> */}
                                                </button>
                                                <button onClick={() => setEditRow(-1)} className="actionBtn">
                                                    <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                                    {/* <h3 className="hidden md:flex">
                                                        Cancel
                                                    </h3> */}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))
                            }
                            {
                                addMode && (
                                    <tr className="">
                                        <td className="text-[13px] font-bold">{setting?.dailyTimeLimitList.length + 1}</td>
                                        <td className="text-[13px] font-bold">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="Minute"
                                                name="value"
                                                value={settingItem.value}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setting?.dailyTimeLimitList.length)}
                                            />
                                        </td>
                                        <td className="text-[13px] font-bold">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="Coins To Boost"
                                                name="coinsToBoost"
                                                value={settingItem.coinsToBoost}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setting?.dailyTimeLimitList.length)}
                                            />
                                        </td>
                                        <td className="text-[13px] space-x-4">
                                            <button onClick={() => { setAddMode(false), submitSetting(); }} className="actionBtn">
                                                <FontAwesomeIcon icon={faSave} className="mr-1" />
                                                {/* <h3 className="hidden md:flex">
                                                    Save
                                                </h3> */}
                                            </button>
                                            <button onClick={() => { setAddMode(false) }} className="actionBtn">
                                                <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                                {/* <h3 className="hidden md:flex">
                                                    Cancel
                                                </h3> */}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setAddMode(true);
                        setEditRow(setting?.dailyTimeLimitList.length);
                        setSettingItem({
                            value: `${setting?.dailyTimeLimitList[setting?.dailyTimeLimitList.length - 1].value}`,
                            coinsToBoost: `${setting?.dailyTimeLimitList[setting?.dailyTimeLimitList.length - 1].coinsToBoost}`,
                        })
                    }} className="actionBtn mt-8">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default timeSetting;