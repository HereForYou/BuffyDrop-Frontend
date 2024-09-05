import { useState } from "react";
import { ENDPOINT } from "../data";
import axios from "axios";
import toast from "react-hot-toast";

interface Dex {
    id: number;
    name: string;
    img: string;
}
interface ISettingProps {
    user: any;
    exchange: any;
    setting: any;
    setShowSetting: (status: boolean) => void;
    setExchange: (status: any) => void;
}

const Setting: React.FC<ISettingProps> = ({ setting, setShowSetting, exchange, user, setExchange }) => {
    const [tab, setTab] = useState<string>('');

    const handleChangeDex = (dex: Dex) => {
        axios.put(`${ENDPOINT}/api/user/dex/${user?.id}`, { dex: dex })
            .then(response => {
                setExchange(dex);
                toast.success("Changed successfully!")
                console.log('response', response.data);
            })
            .catch(error => {
                console.error('Error occurred during PUT request:', error);
            });
    };

    return (
        <div>
            {
                !tab ? (
                    <>
                        <div className="flex flex-row-reverse py-2">
                            <img onClick={() => setShowSetting(false)} src="close.svg" className="w-6 h-6 hover:opacity-80 cursor-pointer"></img>
                        </div>
                        <h4 className="lilita text-white text-[36px] font-bold py-1">Settings</h4>
                        <div onClick={() => setTab('exchange')} className="customCard-container grid grid-col-1 grid-col-1 w-full">
                            <div className="customCard group p-2 transition relative duration-300 cursor-point hover:bg-inherit hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
                                <div className="flex grid-cols-2 gap-3 w-full">
                                    <div className="flex flex-row w-full justify-between">
                                        <div className="flex flex-col">
                                            <h4 className="text-[14px] font-semibold text-left">
                                                Choose an Exchange
                                            </h4>
                                            <h4 className="text-[14px] font-semibold text-left opacity-80">
                                                {exchange?.name}
                                            </h4>
                                        </div>

                                        <div className="flex items-center">
                                            <img src="right.svg" alt="" className="w-6 h-6 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    tab == 'exchange' && (
                        <div className="max-h-[90%] overflow-y-auto">
                            <div className="flex py-2">
                                <img onClick={() => setTab('')} src="back.svg" className="w-6 h-6 hover:opacity-80 cursor-pointer"></img>
                            </div>
                            <h4 className="lilita text-white text-[28px] font-bold py-1">Choose an Exchange</h4>
                            <div className="flex flex-col gap-2">
                                {
                                    setting.dexList.map((item: any) => (
                                        <div key={item.id} className="customCard-container grid grid-col-1 grid-col-1 w-full">
                                            {
                                                item.id == exchange?.id ? (
                                                    <div className="customCard group p-2 transition relative duration-300 cursor-default hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
                                                        <div className="flex grid-cols-2 gap-3 w-full items-center">
                                                            <div className="my-auto w-14">
                                                                <img src={`${item?.img ? `${ENDPOINT}/${item?.img}` : 'unknown.svg'}`} alt="icon" className="w-8 aspect-square rounded-full" />
                                                            </div>
                                                            <div className="flex flex-row w-full justify-between">
                                                                <div className="space-y-2">
                                                                    <p className="text-[14px] font-semibold text-left">
                                                                        {item.name}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <img src="check_n.svg" alt="" className="w-6 h-6 ml-1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => handleChangeDex(item)} className="customCard group p-2 transition relative duration-300 cursor-point hover:bg-inherit hover:shadow-[0 -8px 0px 0px #2196f3] flex justify-between">
                                                        <div className="flex grid-cols-2 gap-3 w-full items-center">
                                                            <div className="my-auto w-14">
                                                                <img src={`${item?.img ? `${ENDPOINT}/${item?.img}` : 'unknown.svg'}`} alt="icon" className="w-8 aspect-square rounded-full" />
                                                            </div>
                                                            <div className="flex flex-row w-full justify-between">
                                                                <div className="space-y-2">
                                                                    <p className="text-[14px] font-semibold text-left">
                                                                        {item.name}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <img src="right.svg" alt="" className="w-6 h-6 ml-1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}
export default Setting;