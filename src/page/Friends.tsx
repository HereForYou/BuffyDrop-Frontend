import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { toast } from 'react-hot-toast';
import { faClone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";

import { ENDPOINT } from "../data";

const desText = `\nJoin me on the exciting journey with BLEGGS! 🚀 Click the LAUNCH button to start mining tokens and turn your efforts into real money. 💰 Let's mine and earn together!`;

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
      <h1 className="text-xl font-bold text-[#acacac] pt-10">Invite friends</h1>
      <h1 className="text-xl font-bold text-[#acacac] pb-2">and get more BUFFYS</h1>
      <div className="w-full flex justify-center">
        <img src="/friends_bg.png" alt="friends_bg" className="h-full px-10 py-2 "/>
      </div>
      <div className="flex flex-col justify-between items-start px-6 text-[#acacac]">
        <h3 className="text-left text-xl font-bold">
        <span>{friends.length}</span> friends
        </h3>
      </div>
      <div className="mt-3 space-y-2 overflow-auto h-[40vh]">
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
                    value={friend.totalPoints}
                  />
                )
              })
            ) : (
              <div>
                <h4 className="opacity-30 pt-10 text-[#acacac]">
                  No Friends yet
                </h4>
              </div>
            )
          )
        }

      </div>
      <div className="absolute bottom-[10vh] w-full px-8">
        <InviteCard title="Invite Friends" profit={inviteRevenue} setShowModal={setShowModal} />
      </div>
      <div className={`absolute bg-[#4b37dd] rounded-3xl flex flex-col w-full right-0 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform ${showModal ? 'bottom-[40px]' : 'bottom-[-400px]'}`}>
        <div className="h-[5px] rounded-full w-[80px] bg-black opacity-80 self-center"></div>
        <h2 className="text-[32px]">Invite Friends</h2>
        <h4 className="text-[16px] text-gray opacity-70">You have <span className="text-yellow-400 font-bold">Unlimited</span> invitations available</h4>
        <a href={`https://t.me/share/url?url=https://t.me/Bleggesminer_bot/Bleggs?startapp=${inviteLink}&text=${desText}`} target="blank" className="bg-[#110d33] p-[4px] rounded-full text-[#acacac] hover:text-[#acacac]">
          <div className="bg-inherit cursor-pointer py-2 hover:bg-indigo-900 rounded-full">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-5" />
            Send
          </div>
        </a>
        <div className="bg-[#110d33] p-[4px] rounded-full">
          <div onClick={handleClipBoardCopy} className="bg-inherit cursor-pointer hover:bg-indigo-900 py-2 rounded-full">
            <FontAwesomeIcon icon={faClone} className="mr-5" />
            Copy Link
          </div>
        </div>
        <div className="bg-[#110d33] p-[4px] rounded-full">
          <div onClick={() => setShowModal(false)} className="bg-inherit cursor-pointer hover:bg-indigo-900 py-2 rounded-full">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};
export default Friends;
