import { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faPlus, faXmark, faPencil, faTrashCan, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ENDPOINT } from "../../data";

const TaskSetting = ({ setting, setSetting }: { setting: any, setSetting: (value: any) => void }) => {
    const [editRow, setEditRow] = useState<number>(-1);
    const [addMode, setAddMode] = useState<boolean>(false);

    const [settingItem, setSettingItem] = useState<any>({
        id: "",
        profit: 0,
        title: "",
        link: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSettingItem({
            ...settingItem,
            [e.target.name]: e.target.value
        });
    }

    const handleDelete = (index: number) => {
        let isSure = window.confirm('You really want to delete this one?');
        if (isSure) {
            axios.delete(`${ENDPOINT}/api/setting/delete/task/${index}`)
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
            id: settingItem.id,
            title: settingItem.title,
            profit: parseInt(settingItem.profit, 10),
            link: settingItem.link,
        }
        axios.put(`${ENDPOINT}/api/setting/update/task/${editRow}`, data)
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
                                <td className="text-[15px] font-bold">No</td>
                                <td className="text-[15px] font-bold">ID</td>
                                <td className="text-[15px] font-bold">Title</td>
                                <td className="text-[15px] font-bold">Profit</td>
                                <td className="text-[15px] font-bold">Link</td>
                                <td className="text-[15px] font-bold">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setting?.taskList.map((item: any, index: number) => (
                                    editRow !== index ? (
                                        <tr key={index}>
                                            <td className="text-[13px] font-bold w-[16%]">{index + 1}</td>
                                            <td className="text-[13px] font-bold w-[16%]">{item.id}</td>
                                            <td className="text-[13px] w-[16%]">{item.title}</td>
                                            <td className="text-[13px] w-[16%]">{item.profit}</td>
                                            <td className="text-[13px] w-[16%]">{item.link}</td>
                                            <td className="text-[13px] w-[16%] space-x-4">
                                                <button onClick={
                                                    () => {
                                                        setEditRow(index);
                                                        setAddMode(false);
                                                        setSettingItem({
                                                            id: `${item.id}`,
                                                            title: `${item.title}`,
                                                            profit: `${item.profit}`,
                                                            link: `${item.link}`,
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
                                            <td className="text-[13px] font-bold w-[16%]">{index + 1}</td>

                                            <td className="text-[13px] font-bold w-[16%]">
                                                <input
                                                    type="text" className="h-[30px] w-[150px]"
                                                    placeholder="ID"
                                                    name="id"
                                                    value={settingItem.id}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                />
                                            </td>
                                            <td className="text-[13px] font-bold w-[16%]">
                                                <input
                                                    type="text" className="h-[30px] w-[150px]"
                                                    placeholder="Title"
                                                    name="title"
                                                    value={settingItem.title}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                />
                                            </td>
                                            <td className="text-[13px] font-bold w-[16%]">
                                                <input
                                                    type="text" className="h-[30px] w-[150px]"
                                                    placeholder="Profit"
                                                    name="profit"
                                                    value={settingItem.profit}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                />
                                            </td>
                                            <td className="text-[13px] font-bold w-[16%]">
                                                <input
                                                    type="text" className="h-[30px] w-[150px]"
                                                    placeholder="Link"
                                                    name="link"
                                                    value={settingItem.link}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                                />
                                            </td>
                                            <td className="text-[13px] w-[16%] space-x-4">
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
                                        <td className="text-[13px] font-bold w-[16%]">{setting?.taskList.length + 1}</td>
                                        <td className="text-[13px] font-bold w-[16%]">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="ID"
                                                name="id"
                                                value={settingItem.id}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                            />
                                        </td>
                                        <td className="text-[13px] font-bold w-[16%]">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="Title"
                                                name="title"
                                                value={settingItem.title}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                            />
                                        </td>
                                        <td className="text-[13px] font-bold w-[16%]">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="Profit"
                                                name="profit"
                                                value={settingItem.profit}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                            />
                                        </td>
                                        <td className="text-[13px] font-bold w-[16%]">
                                            <input
                                                type="text" className="h-[30px] w-[60px]"
                                                placeholder="Link"
                                                name="link"
                                                value={settingItem.link}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
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
                        setEditRow(setting?.taskList.length);
                        setAddMode(true);
                    }} className="actionBtn mt-8">
                        <FontAwesomeIcon icon={faPlus} className="mr-1" />
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskSetting;