import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { toast } from "react-hot-toast";
// import { faClone, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
import LimiteModal from "../component/LimiteModal";
import InviteFriendModal from "../component/InviteFriendModal";
import { ENDPOINT } from "../data";

const desText = `\nJoin me because there’s a reason for spreading the BUFFY buzz. It’s now or never for the BUFFY drop!🍖`;

const Friends = ({
  user,
  inviteRevenue,
  modal,
}: {
  user: any;
  inviteRevenue: number;
  modal: boolean;
}) => {
  const [showModal, setShowModal] = useState<boolean>(modal);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [friends, setFriends] = useState<object[]>([]);
  // const [totalFriendPoints, setTotalFriendPoints] = useState<number>(0.0);
  const hasShownWarningRef = useRef(false);
  const [limiteModal, setLimiteModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
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
          setInviteLink(res.data.inviteLink);
          setFriends(res.data.friendsInfo);
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
    legacyCopy(
      `https://t.me/BuffyDropbot/Buffy Drop?startapp=${inviteLink}${desText}`
    );
    toast.success("Successfully Copied!");
  };
  return (
    <div className='flex flex-col h-full w-full justify-start px-5 gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      <div>
        <h1 className='text-[28px] font-bold text-white pt-20'>
          Invite friends
        </h1>
        <h1 className='text-[28px] font-bold text-white pb-2'>
          and get more BUFFY
        </h1>
      </div>
      <div className='w-full flex justify-center'>
        <img
          src='/friend_img.png'
          alt='friends_bg'
          loading='lazy'
          className='w-64'
        />
      </div>
      <div className='flex flex-col justify-between items-start px-6 text-white'>
        {friends.length != 0 && (
          <h3 className='text-left text-2xl font-bold'>
            <span>{friends.length}</span> friends
          </h3>
        )}
      </div>
      <div className='flex flex-col overflow-auto h-full'>
        {loading ? (
          <div className='flex items-center justify-center w-full'>
            <Loader width='30' />
          </div>
        ) : friends.length > 0 ? (
          friends.map((friend: any) => {
            return (
              <FriendCard
                key={friend.Info.userName}
                name={friend.Info.userName}
                value={friend.revenue}
              />
            );
          })
        ) : (
          <div>
            <h4 className='pt-14 text-white'>
              Tap on the button to invite your friends
            </h4>
          </div>
        )}
      </div>
      <div className='bottom-[10vh] w-full relative'>
        <InviteCard
          title='Invite Friends'
          profit={inviteRevenue}
          setShowModal={setShowModal}
        />
      </div>
      <InviteFriendModal 
        showModal={showModal}
        setShowModal={setShowModal}
        inviteLink={inviteLink}
        handleClipBoardCopy={handleClipBoardCopy}
        setLimiteModal={setLimiteModal}
        desText={desText}
      />
      <LimiteModal
        limitModal={limiteModal}
        handleClose={() => setLimiteModal(false)}
      />
    </div>
  );
};
export default Friends;
