import type { ReactNode } from "react"

interface RegistrationContainerProps {
  children: ReactNode
}

const RegistrationContainer = ({children}: RegistrationContainerProps) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="relative h-dvh w-full overflow-hidden flex items-center justify-center"
    >
      <img src="/other/win11.jpg" alt="wallpaper" className="absolute inset-0 h-full w-full object-cover blur-3xl"/>
      <section className=" h-10/12 md:w-8/12 w-11/12 bg-white/80 overflow-auto md:p-20 p-10 z-10 rounded-lg shadow-2xl">
        {children}
      </section>
    </div>
  )
}

export default RegistrationContainer