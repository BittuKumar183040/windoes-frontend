import { CircleUserRound, Loader2 } from "lucide-react"
import type { ReactNode } from "react"

interface UserProfileImageProps {
  src: string | undefined | null
  size?: number
  loading?: boolean
}

const ImageContainer = ({ children, size = 48 }: {children: ReactNode, size: number}) => {
  return (
    <div
      style={{ height: size + "px", width: size + "px" }}
      className=' relative border-2 border-gray-100/20 bg-gray-100/20 shrink-0 rounded-full overflow-hidden'>
        {children}
    </div>
  )
}

export const UserProfileImage = ({ src, size = 48, loading }: UserProfileImageProps) => {
 
  if (loading)
    { 
      return ( <ImageContainer size={size}>
        <Loader2 size={40} className=" absolute left-1/2 top-1/2 -translate-1/2 animate-spin" />
      </ImageContainer> ) 
    }

  return (
    <ImageContainer size={size}>
      {src ? <img src={src} alt="Profile" className="h-full w-full object-cover" />
        : <CircleUserRound className='h-full w-full scale-140 text-gray-100' strokeWidth={0.5} />
      }
    </ImageContainer>
  )
}
