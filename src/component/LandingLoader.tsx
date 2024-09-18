import Loader from "./Loader";

const LandingLoader = () => {
  return (
    <div className='flex flex-col relative pt-32 justify-center items-center gap-20 h-screen w-full'>
      <img
        src='/dogAvatar.webp'
        className='absolute w-32 top-1/4'
        loading='lazy'
        alt='A cute dog avatar'
      />
      <Loader width='80' />
    </div>
  );
};

export default LandingLoader;
