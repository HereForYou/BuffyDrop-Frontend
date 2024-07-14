import { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faPlus, faXmark, faPencil, faTrashCan, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINT } from "../../data";

const LevelSetting = ({ setting, setSetting }: { setting: any, setSetting: (value: any) => void }) => {
    const [editRow, setEditRow] = useState<number>(-1);
    const [addMode, setAddMode] = useState<boolean>(false);

    const [settingItem, setSettingItem] = useState<any>({
        level: 1,
        coinsToLevelUp: "180"
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setSettingItem({
            ...settingItem,
            level: index + 1,
            [e.target.name]: e.target.value
        });
    }

    const handleDelete = (index: number) => {
        let isSure = window.confirm('You really want to delete this one?');
        if (isSure) {
            axios.delete(`${ENDPOINT}/api/setting/delete/levelStandard/${index + 1}`)
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
            level: settingItem.level,
            earnPerSecond: parseInt(settingItem.earnPerSecond, 10),
            coinsToLevelUp: parseInt(settingItem.coinsToLevelUp, 10)
        }
        axios.put(`${ENDPOINT}/api/setting/update/levelStandard`, data)
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
            <div className="overflow-y-auto text-white py-[30px] w-full">
                <div className="h-[60vh] w-full overflow-y-auto py-2">
                    <table className="text-center w-full">
                        <thead>
                            <tr>
                                <td className="text-[15px] font-bold">Level</td>
                                <td className="text-[15px] font-bold">CoinsToLevelUp</td>
                                <td className="text-[15px] font-bold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setting?.levelStandard.map((item: any, index: number) => (
                                    editRow !== index ? (
                                        <tr key={index}>
                                            <td className="text-[13px] font-bold w-[30%]">{item.level}</td>
                                            <td className="text-[13px] w-[30%]">{item.coinsToLevelUp}</td>
                                            <td className="text-[13px] w-[30%] space-x-4">
                                                <button onClick={
                                                    () => {
                                                        setEditRow(index);
                                                        setAddMode(false);
                                                        setSettingItem({
                                                            level: index + 1,
                                                            earnPerSecond: `${item.earnPerSecond}`,
                                                            coinsToLevelUp: `${item.coinsToLevelUp}`,
                                                        })
                                                    }
                                                } className="actionBtn">
                                                    <FontAwesomeIcon icon={faPencil} className="mr-1" />
                                                    Edit
                                                </button>
                                                <button onClick={
                                                    () => {
                                                        setAddMode(false);
                                                        handleDelete(index);
                                                    }
                                                } className="actionBtn">
                                                    <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={index} className="">
                                            <td className="text-[13px] font-bold w-[30%]">{item.level}</td>
                                            <td className="text-[13px] font-bold w-[30%]">
                                                <input
                                                    type="text" className="h-[30px] w-[60px]"
                                                    placeholder="LevelUp"
                                                    name="coinsToLevelUp"
                                                    value={settingItem.coinsToLevelUp}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                                />
                                            </td>
                                            <td className="text-[13px] w-[30%] space-x-4">
                                                <button onClick={submitSetting} className="actionBtn">
                                                    <FontAwesomeIcon icon={faSave} className="mr-1" />
                                                    Save
                                                </button>
                                                <button onClick={() => setEditRow(-1)} className="actionBtn">
                                                    <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                ))
                            }
                            {
                                addMode && (
                                    <tr className="">
                                        <td className="text-[13px] font-bold">{setting?.levelStandard.length + 1}</td>
                                        <td className="text-[13px] font-bold">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="LevelUp"
                                                name="coinsToLevelUp"
                                                value={settingItem.coinsToLevelUp}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setting?.levelStandard.length)}
                                            />
                                        </td>
                                        <td className="text-[13px] space-x-4">
                                            <button onClick={() => { setAddMode(false), submitSetting(); }} className="actionBtn">
                                                <FontAwesomeIcon icon={faSave} className="mr-1" />
                                                Save
                                            </button>
                                            <button onClick={() => { setAddMode(false) }} className="actionBtn">
                                                <FontAwesomeIcon icon={faXmark} className="mr-1" />
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setAddMode(true);
                        setSettingItem({
                            level: setting?.levelStandard.length + 1,
                            earnPerSecond: `${setting?.levelStandard[setting?.levelStandard.length - 1].earnPerSecond}`,
                            coinsToLevelUp: `${setting?.levelStandard[setting?.levelStandard.length - 1].coinsToLevelUp}`,
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

export default LevelSetting;