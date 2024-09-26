import React from "react";
import { Link } from "react-router-dom";

interface IJoinBuffyModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinBuffyModal: React.FC<IJoinBuffyModalProps> = ({ setIsModal }) => {
  return (
    <div
      className='w-full h-full bg-opacity-0 z-0 absolute top-0 flex justify-center items-center'
      // onDoubleClick={() => setIsModal(false)}
    >
      <div
        className='z-50 flex bg-black flex-col gap-2 justify-center items-center max-w-96 w-10/12 font-consolas text-white py-5 h-fit border border-gray-600 rounded-3xl'
        // onDoubleClick={(event) => event.stopPropagation()}
      >
        <div>
          <img src='/modal.png' alt='modal' />
        </div>
        <p className='font-bold xxs:text-xl text-base px-5'>
          Join our Telegram channel to access Buffy
        </p>
        <p className='xxs:text-sm px-5 text-xs'>
          listing time drops there first!
        </p>
        <div className='flex w-full'>
          <Link
            to='https://t.me/BuffyDrop'
            className='bg-main text-white px-5 w-full py-3 font-roboto text-sm  font-semibold mx-5 rounded-lg cursor-pointer hover:text-gray-300 transition-all duration-300'
            onClick={() => setIsModal(false)}>
            Join for Buffy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinBuffyModal;
