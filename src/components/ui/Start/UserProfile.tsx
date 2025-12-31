
const UserProfile = ({ onClick }: { onClick: ()=>void }) => {

  return (
    <div onClick={onClick} className="flex items-center gap-3 p-3 hover:bg-gray-100/30 rounded-md">
      <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
        <img src="./other/self.jpg" />
      </div>
      <div className="flex flex-col">
        <span className="">Bittu Kumar</span>
      </div>
    </div>
  )
}

export default UserProfile