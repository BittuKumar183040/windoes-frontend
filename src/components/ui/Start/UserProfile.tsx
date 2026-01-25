import { CircleUserRound } from "lucide-react"

const UserProfile = ({ label, src, onClick }: { label?: string, src?: string, onClick: ()=>void }) => {
  return (
    <div onClick={onClick} className="flex items-center gap-3 p-3 hover:bg-gray-100/30 rounded-md">
      <div className=" size-10 border-4 border-gray-100/20 bg-gray-100/20 shrink-0 flex items-center justify-center rounded-full overflow-hidden">
        {
          src ? <img src={src} alt={src} /> 
          : <CircleUserRound className='h-full w-full scale-130 text-gray-600' strokeWidth={0.5} />
        }
      </div>
      { label && 
        <div className="flex flex-col">
          <span className=" text-sm max-w-52 whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
        </div>
      }
    </div>
  )
}

export default UserProfile