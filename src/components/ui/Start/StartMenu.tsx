import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from "react";
import ToolTipNavbar from "../ToolTipNavbar";
import { Download, Power, Settings } from "lucide-react";
import UserProfile from "./UserProfile";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserProfileImage } from "../../../api/user.api";
import { UserProfileImage } from "../UserProfile";
import { getUserFromLocal } from "../../utility/helper/localstorage";
import { useDispatch } from "react-redux";
import { addNewApp } from "../../../features/AppLaunch";

type StartMenuProps = {
  open: boolean;
  setStartOpen: (arg0: boolean) => void;
  buttonRef: React.RefObject<HTMLDivElement | null>;
};

const StartMenu = forwardRef<HTMLDivElement, StartMenuProps>(
  ({ open, setStartOpen, buttonRef }, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = getUserFromLocal();
    const startContainerRef = useRef<HTMLDivElement | null>(null);
    const profileDetailsRef = useRef<HTMLDivElement | null>(null);
    const [logo, setLogo] = useState<string>("");
    const [showProfile, setShowProfile] = useState(false);
    useImperativeHandle(ref, () => startContainerRef.current as HTMLDivElement);
    useEffect(() => {
      if (!user?.id) return;
      const fetchProfileImage = async () => {
        try {
          setLogo(await getUserProfileImage(user.id))
        } catch (error) {
          console.error("Failed to fetch profile image", error);
        }
      };

      fetchProfileImage();
    }, [user?.id]);

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
      setShowProfile(true);
    }

    const handleSignout = () => {
      navigate("/signup");
    }

    const shutdown = () => {
      window.close();
    }

    const settingsClick = () => {
      setStartOpen(false)
      dispatch(addNewApp({
        id: "settings",
        type: "settings",
        name: "Setting",
        icon: "./icons/settings.png",
        isPinned: false,
        data: "",
        isActive: true,
        isClosed: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      }))
    }

    return (
      <ToolTipNavbar className={`w-11/12 md:w-6/12 p-0 mx-auto overflow-hidden`} anchorRef={buttonRef} visible={open} placement="top" openDelayMs={0}>
        <div ref={startContainerRef}>
          <AnimatePresence>
            {showProfile &&
              <motion.div 
                ref={profileDetailsRef} 
                className=" absolute bottom-[60px] space-y-4 p-4 left-10 w-[300px] bg-black/20 backdrop-blur-md rounded-2xl 
                 shadow-xl
                "
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.05 }}
              >
                <div className=" flex justify-between items-center">
                  <div className=" flex gap-2 items-center">
                    {/* <img src="./other/bqpsim.svg" className=" h-10" /> */}
                    <p className=" text-md font-bold">BosonQ Psi Tech. Pvt. Ltd.</p>
                  </div>
                  <button onClick={handleSignout} className=" p-2 px-3 bg-transparent hover:bg-black/5 rounded-md transition-all">Sign Out</button>
                </div>
                <div className={`flex gap-5 items-center`}>
                  <UserProfileImage src={logo} size={70} />
                  <div>
                    <strong className=" text-xl">{user?.name}</strong>
                    <p className=" text-sm">{user?.email}</p>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
          <div className={`flex flex-col py-4 px-12 h-96`}>
            <div className="flex items-center justify-between w-full">
              <strong>Recommended</strong>
              <button>More</button>
            </div>
            <div className=" grid grid-cols-2">
              <div className="flex items-center gap-4 p-3 hover:bg-black/20 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center border rounded-full">
                  <span className="">BK</span>
                </div>
                <div className=" leading-5">
                  <p>Title</p>
                  <p>Description</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-black/20 rounded-md">
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

          <div className={`flex items-center justify-between py-4 px-12 bg-black/10`}>
            <div className={`${showProfile && "pointer-events-none"} `}>
              <UserProfile label={user?.name} src={logo} onClick={handleProfileClick} />
            </div>
            <div className="flex items-center">
              <button className="flex gap-4 p-4 rounded-md hover:bg-black/20 transition" >
                <Download strokeWidth={1} size={18} />
              </button>
              <button onClick={settingsClick} className="flex gap-4 p-4 rounded-md hover:bg-black/20 transition" >
                <Settings strokeWidth={1} size={18} />
              </button>
              <button className="flex gap-4 p-4 rounded-md hover:bg-black/20 transition" >
                <Power onClick={shutdown} strokeWidth={1} size={18} />
              </button>
            </div>
          </div>
        </div>
      </ToolTipNavbar>
    );
  }
);

export default StartMenu;
