import { Camera, Search } from "lucide-react"
import { useEffect, useState } from "react";

export const EyeLoading = () => {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 16 C 12 1, 36 1, 42 16"
        stroke="white"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          dur="7s"
          repeatCount="indefinite"
          values="
            M6 16 C 12 16, 36 16, 42 16;
            M6 16 C 12 1, 36 1, 42 16;
            M6 16 C 12 1, 36 1, 42 16;
            M6 16 C 12 1, 36 1, 42 16;
            M6 16 C 12 16, 36 16, 42 16;
            M6 16 C 12 16, 36 16, 42 16;
            M6 16 C 12 16, 36 16, 42 16
          "
          keyTimes="0; 0.02; 0.17; 0.3; 0.36; 0.43; 1"
        />
      </path>

      <circle cx="24" cy="16" r="10" fill="white">
        <animate
          attributeName="r"
          dur="7s"
          repeatCount="indefinite"
          values="0; 4; 4; 4; 0; 0; 0"
          keyTimes="0; 0.06; 0.17; 0.3; 0.36; 0.43; 1"
        />
      </circle>
    </svg>
  );
};

const SliderContent = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit", hour12: false
  });

  const date = now.toLocaleDateString([], {
    weekday: "long", month: "long", day: "numeric",
  });

  return (<>
    <div className=" flex justify-around py-20">
      <div className=" flex flex-col gap-4 tracking-wide w-80 text-xl items-center text-center">
        <p className=" p-4 bg-black/30 rounded-xl w-fit"><Search className=" rotate-90 " /></p>
        <p>We're looking at drift ice floating in the coastal waters of one of the world's largest islands.</p>
      </div>
      <div className=' flex flex-col text-center justify-center'>
        <div className=" text-white text-xl flex flex-col items-center gap-4">
          <EyeLoading />
          <p>Looking for you...</p>
        </div>
        <div className="mt-8 text-white">
          <p className="text-[120px] font-bold leading-none">{time}</p>
          <p className="text-[40px]">{date}</p>
        </div>

      </div>
      <div className=" flex flex-col gap-4 tracking-wide w-80 text-xl items-center text-center">
        <p className=" p-4 bg-black/30 rounded-xl w-fit"><Camera /></p>
        <p>Like the image that you see?</p>
      </div>
    </div>
  </>
  )
}

export default SliderContent