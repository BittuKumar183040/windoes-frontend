import { UserProfileImage } from "../UserProfile"

const UserProfile = ({ label, src, onClick }: { label?: string, src?: string, onClick: ()=>void }) => {
  return (
    <div onClick={onClick} className="flex items-center gap-3 p-3 hover:bg-gray-100/30 rounded-md">
      <UserProfileImage src={src} size={32} />
      { label && 
        <div className="flex flex-col">
          <span className=" text-md max-w-52 whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
        </div>
      }
    </div>
  )
}

export default UserProfile