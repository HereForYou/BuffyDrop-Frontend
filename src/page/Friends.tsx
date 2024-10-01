import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { toast } from "react-hot-toast";
// import { faClone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
import { ChevronDown } from "lucide-react";
import LimiteModal from "../component/LimiteModal";
import InviteFriendModal from "../component/InviteFriendModal";
import { ENDPOINT } from "../data";
import { useTimeContext } from "../context/TimeContextProvider";

const desText = `\nJoin me because there’s a reason for spreading the BUFFY buzz. It’s now or never for the BUFFY drop!🍖`;

const Friends = ({ user, inviteRevenue, modal }: { user: any; inviteRevenue: number; modal: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(modal);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [friends, setFriends] = useState<object[]>([]);
  const hasShownWarningRef = useRef(false);
  const [limiteModal, setLimiteModal] = useState<boolean>(false);
  const [numOfInvites, setNumOfInvites] = useState(0);
  const [showFriends, setShowFriends] = useState(false);
  const auth = useTimeContext();
  // console.log("This is telegram userId > ", auth?.userId);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setInviteLink(auth?.userId);
    if (!hasShownWarningRef.current && user) {
      //https:reques
      setLoading(true);
      axios
        .get(`${ENDPOINT}/api/user/friend/${user?.id}`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // or any value you prefer
          },
        })
        .then((res) => {
          console.log("friends > res.data", res.data);
          setFriends(res.data.friendsInfo);
          setNumOfInvites(res.data.friendsInfo.length % 4);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // toast.error("Something Went Wrong!");
        });
      hasShownWarningRef.current = true;
    }
  }, []);
  //clipBoard
  function legacyCopy(value: string) {
    const ta = document.createElement("textarea");
    ta.value = value ?? "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }

  const handleClipBoardCopy = async () => {
    legacyCopy(`https://t.me/BuffyDropbot/BuffyDrop?startapp=${inviteLink}${desText}`);
    toast.success("Successfully Copied!");
  };

  return (
    <div className='flex flex-col friends-content w-full justify-start px-5 gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      <div className='w-full flex justify-center pt-20'>
        <img src='/friends/voice.png' alt='friends_bg' loading='lazy' className='w-48' />
      </div>
      <div className='font-consolas'>
        <h1 className='text-3xl font-bold text-white'>Invite friends</h1>
        <h1 className='text-base font-bold text-white pb-2'>Invite 3 friends to be eligible for the airdrop</h1>
      </div>
      <div className='w-full flex justify-center min-h-[72px] items-end'>
        <img
          src={`/friends/${numOfInvites === 3 ? "openBox.png" : "closeBox.png"}`}
          alt='friends_bg'
          loading='lazy'
          className='w-16 h-fit'
        />
      </div>
      <div className='relative h-14'>
        <div className='flex w-[calc(100%+4px)] -left-0.5 bg-black h-5 transform origin-center -rotate-[0.8deg] relative top-3' />
        <div className='flex w-full h-8 justify-start'>
          <div
            className={`bg-green-500 transition-all duration-500 ${
              numOfInvites === 0 ? "w-0" : numOfInvites === 3 ? "w-full" : numOfInvites === 1 ? "w-1/3" : "w-2/3"
            }`}
          />
          <div
            className={`bg-gray-500 transition-all duration-500 ${
              numOfInvites === 0 ? "w-full" : numOfInvites === 3 ? "w-0" : numOfInvites === 1 ? "w-2/3" : "w-1/3"
            }`}
          />
        </div>
        <div className='flex w-[calc(100%+4px)] -left-0.5 bg-black h-5 transform origin-center rotate-[0.8deg] relative -top-3' />
        <div className='absolute w-3 h-3 top-[30px] -left-1.5 rounded-full bg-white' />
        <div
          className={`absolute w-4 h-4 top-7 left-1/3 -translate-x-1/2 rounded-full transition-all delay-500 duration-300 ${
            numOfInvites > 0 ? "bg-green-500" : "bg-white"
          }`}
        />
        <div
          className={`absolute w-5 h-5 top-[26px] left-2/3 -translate-x-1/2 rounded-full transition-all delay-500 duration-300 ${
            numOfInvites > 1 ? "bg-green-500" : "bg-white"
          }`}
        />
        <div
          className={`absolute w-6 h-6 top-6 -right-1 rounded-full transition-all delay-500 duration-300 ${
            numOfInvites > 2 ? "bg-green-500" : "bg-white"
          }`}
        />
      </div>
      <div
        className='flex gap-2 items-center bg-main bg-opacity-30 p-2'
        onClick={() => setNumOfInvites((prev) => (prev + 1) % 4)}>
        <img src='/friends/lampHint.png' alt='lampHint' loading='lazy' className='w-6' />
        <div className='flex flex-col gap-0.5 w-full text-xs font-consolas'>
          <p className='text-justify w-full'>The more friends you invite, the more rewards you earn.</p>
          <p className='text-justify w-full'>You&apos;ll receive %1-2 of each friends&apos;s tokens as a bonus.</p>
        </div>
      </div>
      <div className='flex w-full pt-5'>
        <InviteCard title='Invite' profit={inviteRevenue} setShowModal={setShowModal} />
      </div>
      <div className='flex justify-between items-center px-6 bg-main bg-opacity-30 text-white font-semibold rounded-lg py-2.5 font-consolas text-lg'>
        <p>{friends.length} friends</p>
        <div onClick={() => setShowFriends((prev) => !prev)}>
          <ChevronDown size={24} className={`transform ${showFriends && 'rotate-180'} transition-all duration-300`} />
        </div>
      </div>
      {/* <div className='flex flex-col justify-between items-start px-6 text-white'>
        {friends.length != 0 && (
          <h3 className='text-left text-2xl font-bold'>
            <span>{friends.length}</span> friends
          </h3>
        )}
      </div> */}
      {showFriends && (
        <div className='flex flex-col'>
          {loading ? (
            <div className='flex items-center justify-center w-full'>
              <Loader width='30' />
            </div>
          ) : friends.length > 0 ? (
            friends.map((friend: any) => {
              return <FriendCard key={friend.Info.userName} name={friend.Info.userName} value={friend.revenue} />;
            })
          ) : (
            <div>
              <h4 className='py-2 text-white'>Tap on the button to invite your friends</h4>
            </div>
          )}
        </div>
      )}

      <InviteFriendModal
        showModal={showModal}
        setShowModal={setShowModal}
        inviteLink={inviteLink}
        handleClipBoardCopy={handleClipBoardCopy}
        setLimiteModal={setLimiteModal}
        desText={desText}
      />
      <LimiteModal limitModal={limiteModal} handleClose={() => setLimiteModal(false)} />
    </div>
  );
};
export default Friends;
