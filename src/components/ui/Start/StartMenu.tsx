import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import ToolTipNavbar from "../ToolTipNavbar";
import { Download, Power, Settings } from "lucide-react";
import UserProfile from "./UserProfile";
import { AnimatePresence, motion } from "framer-motion";

type StartMenuProps = {
  open: boolean;
  buttonRef: React.RefObject<HTMLDivElement | null>;
};

const StartMenu = forwardRef<HTMLDivElement, StartMenuProps>(
  ({ open, buttonRef }, ref) => {

    const startContainerRef = useRef<HTMLDivElement | null>(null);
    const profileDetailsRef = useRef<HTMLDivElement | null>(null);

    const [showProfile, setShowProfile] = useState(false);

    useImperativeHandle(ref, () => startContainerRef.current as HTMLDivElement);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          profileDetailsRef.current &&
          !profileDetailsRef.current.contains(e.target as Node)
        ) {
          setShowProfile(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    const handleProfileClick = () => {
      setShowProfile(true)
    }

    return (
      <ToolTipNavbar className="w-11/12 md:w-6/12 p-0 mx-auto overflow-hidden bg-transparent text-black backdrop-blur-sm" anchorRef={buttonRef} visible={open} placement="top" openDelayMs={0}>
        <div ref={startContainerRef}>
          <AnimatePresence>
            {showProfile &&
              <motion.div 
                ref={profileDetailsRef} 
                className=" absolute bottom-[60px] space-y-4 p-4 left-10 w-[300px] bg-[#dddbe3]/80 backdrop-blur-md rounded-2xl 
                 shadow-xl
                "
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.05 }}
              >
                <div className=" flex justify-between items-center">
                  <div className=" flex gap-2 items-center">
                    <img src="./other/bqpsim.svg" className=" h-10" />
                    <p className=" text-md font-bold">BosonQ Psi Tech. Pvt. Ltd.</p>
                  </div>
                </div>
                <div className={`flex gap-5 items-center`}>
                  <img src="./other/self.jpg" className=" h-24 rounded-full" />
                  <div>
                    <strong className=" text-xl">Bittu Kumar</strong>
                    <p className=" text-sm">bk183040@gmail.com</p>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
          <div className="flex flex-col py-4 px-12 bg-[#dddbe3]/90 h-96">
            <div className="flex items-center justify-between w-full">
              <strong>Recommended</strong>
              <button>More</button>
            </div>
            <div className=" grid grid-cols-2">
              <div className="flex items-center gap-4 p-3 hover:bg-gray-100/30 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center border rounded-full">
                  <span className="">BK</span>
                </div>
                <div className=" leading-5">
                  <p>Title</p>
                  <p>Description</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-gray-100/30 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center border rounded-full">
                  <span className="">BK</span>
                </div>
                <div className=" leading-5">
                  <p>Title</p>
                  <p>Description</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 px-12 bg-[#dddbe3]/85">
            <div className={`${showProfile && "pointer-events-none"} `}>
              <UserProfile onClick={handleProfileClick} />
            </div>
            <div className="flex items-center">
              <button className="flex gap-4 p-4 rounded-md hover:bg-gray-100/70 transition" >
                <Download strokeWidth={1} size={18} />
              </button>
              <button className="flex gap-4 p-4 rounded-md hover:bg-gray-100/70 transition" >
                <Settings strokeWidth={1} size={18} />
              </button>
              <button className="flex gap-4 p-4 rounded-md hover:bg-gray-100/70 transition" >
                <Power strokeWidth={1} size={18} />
              </button>
            </div>
          </div>
        </div>
      </ToolTipNavbar>
    );
  }
);

export default StartMenu;
