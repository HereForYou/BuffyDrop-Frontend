import CommunityCard from "./CommunityCard";
interface BuffyCommunityProps {
  link: any;
  title: string;
}
const BuffyCommunity: React.FC<BuffyCommunityProps> = ({ link, title }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-xl text-[#acacac] font-bold pt-16 pb-6">
        <img src="/buffy_community_img.png" alt="" className="w-[25vw] pb-4"/>
        {/* <div>{title}</div> */}
        <div>BUFFY COMMUNITY</div>
      </div>
      <CommunityCard 
        key={"CommunityCard"}
        link = {`https://t.me/BuffyDrops`}
        avatar = {"/tg_icon.png"}
        title = {"Join our TG channel"}
        buffy = {100000}
        status = {false}
      />
      <CommunityCard 
        key={"CommunityCard"}
        link = {`https://twitter.com/BuffyDrops`}
        avatar = {"/twitter_icon.png"}
        title = {"Follow our X account"}
        buffy = {100000}
        status = {true}
      />
      <CommunityCard 
        key={"CommunityCard"}
        link = {`https://www.instagram.com/BuffyDrops`}
        avatar = {"/instagram_icon.png"}
        title = {"Follow us on Instagram"}
        buffy = {100000}
        status = {false}
      />
      <CommunityCard 
        key={"CommunityCard"}
        link = {`https://www.youtube.com/c/BuffyDrops`}
        avatar = {"/youtube_icon.png"}
        title = {"Follow our YouTube Channel"}
        buffy = {100000}
        status = {false}
      />
      <CommunityCard 
        key={"CommunityCard"}
        link = {`https://www.tiktok.com/@BuffyDrops`}
        avatar = {"/tt_icon.png"}
        title = {"Join our TT channel"}
        buffy = {100000}
        status = {true}
      />
    </>
  );
};

export default BuffyCommunity;
