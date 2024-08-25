import React, { useEffect, useState } from 'react'
import { ENDPOINT } from '../data';
import axios from 'axios';

interface Dex {
    id: number;
    name: string;
    img: string;
}
interface ExchangeSelectorProps {
    setting: any;
    user: any;
    exchange: any;
}

const ExchangeSelector: React.FC<ExchangeSelectorProps> = ({ setting, user, exchange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Dex | null>(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionSelect = (dex: Dex) => {
        axios.put(`${ENDPOINT}/api/user/dex/${user?.id}`, { dex: dex })
            .then(response => {
                console.log('response', response.data);
            })
            .catch(error => {
                console.error('Error occurred during PUT request:', error);
            });
        setSelectedOption(dex);
        setIsOpen(false);
    };

    useEffect(() => {
        setSelectedOption(exchange);
    }, [exchange])

    return (
        <div className="relative w-[120px] text-[13px]">
            <button onClick={toggleDropdown} className="px-2 border-[1px] border-[#4D8CEC] bg-[#F5FAFF] rounded-full flex flex-row w-full items-center gap-1">
                <img src={`${selectedOption?.img ? `${ENDPOINT}/${selectedOption?.img}` : 'dollar.png'}`} className={`rounded-full overflow-hidden w-6 h-6`} />
                <h2>{selectedOption?.name}</h2>
            </button>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H14V2H13V3H12V4H11V5H10V6H9V7H8V8H6V7H5V6H4V5H3V4H2V3H1V2H0V0ZM4 2V3H5V4H6V5H8V4H9V3H10V2H4Z" fill="#4D8CEC" />
                </svg>
            </div>
            {isOpen && (
                <div className="z-20 absolute mt-2 border border-[#4D8CEC] bg-[#F5FAFF] rounded-[10px] shadow-md w-full max-h-[200px] overflow-y-auto">
                    {setting.dexList.map((dex: any) => (
                        <div key={dex?.id} onClick={() => handleOptionSelect(dex)} className="p-2 flex flex-row cursor-pointer items-center gap-1">
                            <img src={`${dex.img ? `${ENDPOINT}/${dex.img}` : 'dollar.png'}`} className='rounded-full overflow-hidden w-6 h-6' />
                            <h2>{dex?.name}</h2>
                        </div>
                    ))
                    }
                </div >
            )}
        </div >
    );
};

export default ExchangeSelector;