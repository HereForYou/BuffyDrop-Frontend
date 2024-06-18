export default function Header() {
  return (
    <div className=" font-bold h-11" style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #2F2F2F", height: "60px"}}>
        <div></div>
        <h1 style={{fontSize: "20px", color: "white", marginLeft: "40px"}}>Mike Token</h1>
        <img src="/image/ewallet.png" alt="" width={30} height={30} style={{marginRight: "30px"}}/>
    </div>
  );
}
