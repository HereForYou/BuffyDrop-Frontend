import TokenCard from "../TokenCard";

const Markets = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-4">
        <TokenCard
          image="/image/fantoken.png"
          content="Fan tokens"
          value="64.1k"
          revune="234.23K"
        />
        <TokenCard
          image="/image/staking.png"
          content="Staking"
          value="10.1k"
          revune="212.23k"
        />
        <TokenCard
          image="/image/btc.png"
          content="BTC pairs"
          value="64.1k"
          revune="453"
        />
        <TokenCard
          image="/image/staking.png"
          content="Staking"
          value="10.1k"
          revune="212.23k"
        />
        <TokenCard
          image="/image/btc.png"
          content="BTC pairs"
          value="64.1k"
          revune="453"
        />
        <TokenCard
          image="/image/eth.png"
          content="ETH pairs"
          value="10.1k"
          revune="716"
        />
        <TokenCard
          image="/image/staking.png"
          content="Staking"
          value="10.1k"
          revune="212.23k"
        />
        <TokenCard
          image="/image/btc.png"
          content="BTC pairs"
          value="64.1k"
          revune="453"
        />
        <TokenCard
          image="/image/eth.png"
          content="ETH pairs"
          value="10.1k"
          revune="716"
        />
        <TokenCard
          image="/image/eth.png"
          content="ETH pairs"
          value="10.1k"
          revune="716"
        />
      </div>
    </>
  );
};
export default Markets;
