import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
const Friends = () => {
  return (
    <div className="pb-[40px]">
      <h1 className="lilita text-4xl font-bold text-white pb-[30px]">Invite Friends!</h1>
      <div className="space-y-2 py-3">
        <InviteCard title="Invite a friend" profit="343,3432" />
      </div>
      <div className="flex flex-col justify-between items-start">
        <h3 className="lilita text-left text-[20px] font-bold">
          Friends Invited
        </h3>
        <h3 className="text-left pb-2 text-[15px] font-semibold opacity-80">
          List of your friends(15)
        </h3>
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
