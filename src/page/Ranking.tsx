import RankingList from "../component/RankingList";

export default function Ranking() {
  return (
    <div className="Ranking max-w-full mx-auto  h-[75vh] max-sm:h-[82vh] mt-8">
      <h1 className="text-3xl mb-3  max-w-[500px] mx-auto text-start  flex justify-center">Ranking</h1>
      <RankingList />
    </div>
  )
}
