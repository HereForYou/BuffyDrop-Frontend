interface InviteCardProps {
  setShowModal: (status: boolean) => void
  title: string
  profit: number
}
const InviteCard: React.FC<InviteCardProps> = ({ setShowModal, title }) => {
  return (
    <div
      onClick={() => setShowModal(true)}
      className='bg-[#4b37dd] p-2 rounded-lg transition duration-200 cursor-pointer hover:bg-indigo-700 hover:translate-y-[2px]'
    >
      <h2 className='text-center font-medium'>{title}</h2>
    </div>
  )
}

export default InviteCard
