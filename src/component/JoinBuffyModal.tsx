import React from "react";

interface IJoinBuffyModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinBuffyModal: React.FC<IJoinBuffyModalProps> = ({ setIsModal }) => {
  return (
    <div className='absolute flex bg-black flex-col gap-2 justify-center items-center top-1/2 -translate-y-1/2 max-w-96 left-1/2 -translate-x-1/2 w-10/12 font-consolas text-white py-5 h-fit border border-gray-600 rounded-3xl'>
      <div>
        <img src='/modal.png' alt='modal' />
      </div>
      <p className='font-bold xxs:text-xl text-base px-5'>
        Join our Telegram channel to access Buffy
      </p>
      <p className='xxs:text-sm px-5 text-xs'>
        listing time drops there first!
      </p>
      <div className='px-5 w-full'>
        <button
          className='bg-main w-full font-roboto text-sm py-3 font-semibold'
          onClick={() => setIsModal(false)}>
          Join for Buffy
        </button>
      </div>
    </div>
  );
};

export default JoinBuffyModal;
