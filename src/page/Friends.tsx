import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { toast } from 'react-hot-toast';
import { faClone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";

import { ENDPOINT } from "../data";

const desText = `\nCome and join me on the journey with Bleggs! Click the invite link and begin farming to unlock exciting rewards! 🎁`;

const Friends = ({ user, inviteRevenue }: { user: any, inviteRevenue: number }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [friends, setFriends] = useState<object[]>([]);
  // const [totalFriendPoints, setTotalFriendPoints] = useState<number>(0.0);
  const hasShownWarningRef = useRef(false);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!hasShownWarningRef.current && user) {
      //https:reques
      setLoading(true);
      axios.get(`${ENDPOINT}/api/user/friend/${user?.id}`)
        .then((res) => {
          let userInfo = res.data;
          setInviteLink(userInfo.inviteLink);
          setFriends(userInfo.friendsInfo);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // toast.error("Something Went Wrong!");
        })
      hasShownWarningRef.current = true;
    }
  }, [])
  //clipBoard
  function legacyCopy(value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  const handleClipBoardCopy = async () => {
    legacyCopy(`
https://t.me/Bleggesminer_bot/Bleggs?startapp=${inviteLink}
${desText}`);
    toast.success("Successfully Copied!");
  }
  return (
    <div className="pb-[40px]">
      <h1 className="lilita text-4xl font-bold text-white pb-[30px]">Invite Friends!</h1>
      <div className="space-y-2 py-3">
        <InviteCard title="Invite a friend" profit={inviteRevenue} setShowModal={setShowModal} />
      </div>
      <div className="flex flex-col justify-between items-start text-white">
        <h3 className="lilita text-left text-[20px] font-bold">
          Friends Invited
        </h3>
        <h3 className="text-left text-[15px] font-semibold opacity-80">
          List of your friends<span>({friends.length})</span>
        </h3>
      </div>
      <div className="mt-3 space-y-2 overflow-auto h-[45vh]">
        {
          loading ? (
            <div className="flex items-center justify-center w-full">
              <Loader width="30" />
            </div>
          ) : (
            friends.length > 0 ? (
              friends.map((friend: any) => {
                return (
                  <FriendCard
                    key={friend.userName}
                    name={friend.userName}
                    role="Friend"
                    level={friend.level}
                    value={friend.totalPoints}
                  />
                )
              })
            ) : (
              <div>
                <h4 className="opacity-30 pt-10 text-white">
                  No Friends yet
                </h4>
              </div>
            )
          )
        }

      </div>
      <div className={`absolute customCard-container flex flex-col w-full right-0 text-white px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform ${showModal ? 'bottom-[40px]' : 'bottom-[-400px]'}`}>
        <div className="h-[5px] rounded-full w-[80px] bg-black opacity-80 self-center"></div>
        <h2 className="text-[32px]">Invite Friends</h2>
        <h4 className="text-[16px] text-gray opacity-70">You have <span className="text-red-600 font-bold">Unlimited</span> invitations available</h4>
        <a href={`https://t.me/share/url?url=https://t.me/Bleggesminer_bot/Bleggs?startapp=${inviteLink}&text=${desText}`} target="blank" className="customCard-container p-[4px] rounded-full text-white hover:text-white">
          <div className="customCard cursor-pointer py-2 hover:bg-inherit rounded-full">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-5" />
            Send
          </div>
        </a>
        <div className="customCard-container p-[4px] rounded-full">
          <div onClick={handleClipBoardCopy} className="customCard cursor-pointer hover:bg-inherit py-2 rounded-full">
            <FontAwesomeIcon icon={faClone} className="mr-5" />
            Copy Link
          </div>
        </div>
        <div className="customCard-container p-[4px] rounded-full">
          <div onClick={() => setShowModal(false)} className="customCard cursor-pointer hover:bg-inherit py-2 rounded-full">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
export default Friends;
