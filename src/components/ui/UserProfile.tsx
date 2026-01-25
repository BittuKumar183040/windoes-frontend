import { CircleUserRound } from "lucide-react"

interface UserProfileImageProps {
  src: string | undefined | null
  size?: number
}

export const UserProfileImage = ({ src, size = 48 }: UserProfileImageProps) => {
  return (
    <div
      style={{ height: size + "px", width: size + "px" }}
      className=' border-2 border-gray-100/20 bg-gray-100/20 shrink-0 rounded-full overflow-hidden'>
      {src ? <img src={src} alt="Profile" className="h-full w-full object-cover" />
        : <CircleUserRound className='h-full w-full scale-140 text-gray-300' strokeWidth={0.5} />
      }
    </div>
  )
}
