import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
const Friends = () => {
  return (
    <div className="px-4 pb-24">
      <p className=" text-4xl font-bold">Invite Friends!</p>
      <p className=" text-xl pt-4 pb-6">
        You and your friend will receive bonuses!
      </p>
      <div className="space-y-2 py-3">
        <InviteCard title="Invite a friend" profit="343,3432" />
        <InviteCard
          title="Invite a friend with Telegram Preminum"
          profit="5000"
        />
      </div>
      <div>
        <p className="text-blue-700 text-2xl font-bold py-2 md:py-4">
          More bonuses
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-left py-2  text-xl font-semibold">
          List of your friends(15)
        </p>
        <img
          src="/image/redo.png"
          alt=""
          className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mt-1"
        />
      </div>
      <div className="mt-3 space-y-2">
        <FriendCard
          name="Lari0 | FutureValueApp"
          role="Platium"
          profit="495.3K"
          value="+321K"
        />
        <FriendCard
          name="Dan Ber"
          role="Platium"
          profit="445.3K"
          value="+25K"
        />
        <FriendCard
          name="Lari0 | FutureValueApp"
          role="Platium"
          profit="495.3K"
          value="+321K"
        />
        <FriendCard
          name="Dan Ber"
          role="Platium"
          profit="445.3K"
          value="+25K"
        />
        <FriendCard name="Andria" role="Platium" profit="435.3K" value="+35K" />
      </div>
    </div>
  );
};
export default Friends;
