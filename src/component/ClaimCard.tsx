import '../App.css'
import TGImg from '../assets/tg.svg'
import XImg from '../assets/x.svg'
import DOGImg from '../assets/dogs.svg'
import TonImg from '../assets/tonkeeper.svg'
import GasImg from '../assets/gas.svg'

const ChannelLink = [
  {
    link: 'https://t.me/BuffyDrop',
    img: TGImg,
    title: 'Buffy community'
  },
  {
    link: 'https://twitter.com/BuffyDrop',
    img: XImg,
    title: 'Buffy on X.COM'
  },
  {
    link: 'https://t.me/boost/BuffyDrop',
    img: DOGImg,
    title: 'Boost Buffy'
  }
]

const WalletLink = [
  {
    link: 'https://app.tonkeeper.com',
    img: TonImg,
    title: 'Install Tonkeeper'
  },
  {
    link: 'https://web.telegram.org/a/#7535345811',
    img: GasImg,
    title: 'Get Toncoin for gas'
  }
]

interface ClaimCardProps {
  userId: any,
  handleClose: () => void
}

const ClaimCard = ({ handleClose }: ClaimCardProps) => {
  return (
    <div
      className={`absolute bg-[#161616] rounded-xl flex flex-col left-0 right-0 -bottom-1 z-50 text-[#acacac] px-4 py-2 pb-8 gap-4 transition-all duration-500 ease-out transform`}
    >
      <div onClick={handleClose} className='closeBtn'></div>
      <div className='text-xl pt-3'>Token claim hints</div>
      <div className='p-2'>
        <div className='text-xl text-left py-2'>Follow official channels</div>
        <div>
          {ChannelLink.map((data, index) => (
            <a key={index} href={data.link} className='text-[#acacac]' target='_blank'>
              <div
                key={index}
                className='flex flex-row py-3 items-center text-base'
              >
                <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-[#282828]'>
                  <img src={data.img} alt={'imgage'} />
                </div>
                <div className='pl-3'>{data.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div>
        <div className='text-xl text-left py-2'>Prepare your wallet</div>
        <div>
          {WalletLink.map((data, index) => (
            <a href={data.link} className='text-[#acacac]' target={`${data.title == 'Install Tonkeeper' ? '_blank' : '_parent'}`}>
              <div
                key={index}
                className='flex flex-row py-3 items-center text-base'
              >
                <img src={data.img} alt={'imgage'} />
                <div className='pl-3'>{data.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ClaimCard
