const NotFound = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center w-full p-10 text-white text-base xxs:text-lg font-consolas'>
      <div>
        <img src='404.png' alt='404' className='w-full max-w-72' />
      </div>
      <p className='text-5xl font-roboto font-extralight'>OOPS...</p>
      <div>
        <p>We are upgrading Buffy ...</p>
        <p>Thanks for your patience</p>
      </div>
    </div>
  );
};

export default NotFound;
