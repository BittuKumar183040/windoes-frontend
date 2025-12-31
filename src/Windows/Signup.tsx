import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"
import background from "../assets/desktop_backgroud.jpg"
import { CircleUserRound, Grip } from 'lucide-react';
import backendAPI from '../components/utility/helper/apiRequestService';
import SwitchUser from '../components/ui/Signup/SwitchUser';

const Signup = () => {
  const navigate = useNavigate();
  const [isSliderLoaded, setIsSliderLoaded] = useState(true);
  const [isIncorrectPasswordState, setIsIncorrectPasswordState] = useState(false);
  const [password, setPassword] = useState("SecurePass123!");
  const [usernameOrEmail] = useState(localStorage.getItem("email") || "red@example.com");
  const [switchUser, setSwitchUser] = useState(false)

  const handleSlideup = () => {
    setIsSliderLoaded(false)
  }

  const handleEnterkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      hitApi();
    }
  }

  const hitApi = async () => {
    try {
      const payload = { usernameOrEmail, password };
      console.log(payload)
      const response = await backendAPI.post("/auth/login", payload);
      console.log(response.data.message);
      localStorage.setItem("setUsernameOrEmail", usernameOrEmail)
      navigate('/desktop')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed : ", error.message);
      } else {
        console.error("Login failed : ", error);
      }
      setIsIncorrectPasswordState(true);
    }
  };

  const handleSwitchUser = async () => {
    setSwitchUser(!switchUser);
  }

  return (
    <div onContextMenu={(e) => e.preventDefault()} className='relative h-dvh w-full overflow-hidden'>
      {switchUser === true && <SwitchUser />}
      <motion.div
        style={{ position: "absolute", backgroundImage: `URL(${background})`, backgroundSize: 'cover', top: 0, left: 0, height: "100%", width: "100%", zIndex: 0 }}
        animate={{ filter: isSliderLoaded ? "blur(0px)" : "blur(12px)", zIndex: isSliderLoaded ? 0 : -10 }}
        transition={{ duration: 1 }}
        onClick={handleSlideup}
      >
      </motion.div>

      {!isSliderLoaded &&
        <motion.div
          onContextMenu={(e) => e.preventDefault()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='relative h-full w-full flex items-center justify-center'
        >
          {switchUser === false &&
            <div className=' flex flex-col gap-6 justify-between items-center h-fit'>
              <div className=' h-60 w-60 shrink-0 bg-amber-100 rounded-full'></div>
              <p className=' text-4xl font-bold tracking-wide'>Bittu Kumar</p>
              {isIncorrectPasswordState ? <>
                <p className=' text-white text-lg'>The PIN is incorrect. Try again.</p>
                <button 
                  onClick={() => setIsIncorrectPasswordState(false)} 
                  className=' p-2 px-14 bg-white/20 rounded-md  text-xl border-transparent border-2 hover:border-white active:border-white '>
                    OK
                </button>
              </>
                : <>
                  <Grip size={50} />
                  <p className=' text-3xl'>Enter Your Pin</p>
                  <input
                    type="text"
                    value={password}
                    onKeyDown={handleEnterkey}
                    onChange={(e) => setPassword(e.target.value)} placeholder='PIN' autoFocus
                    className=' box-content text-xl border-2 bg-clip-padding rounded-md p-3 w-96 outline-none transition-all
                    border-white/10 border-b-gray-300 bg-white/10
                    active:border-white/10 active:border-b-indigo-300 active:bg-gray-800/80
                    focus:border-white/10 focus:border-b-indigo-300 focus:bg-gray-800/80
                  ' />
                  <p className=' text-white/50 text-lg'>I forgot my pin </p>
                </>
              }
            </div>
          }
          <div className=' absolute left-5 bottom-5 flex flex-col gap-1'>
            <button className=' bg-white/10 p-2 px-4 flex items-center gap-3 rounded-md'>
              <div className='h-15 w-15 shrink-0 bg-amber-100 rounded-full'></div>
              <p className=' text-lg'>Switch user</p>
            </button>
            <button onClick={handleSwitchUser} className=' bg-white/10 p-2 px-4 flex items-center gap-3 rounded-md'>
              <div className='h-15 w-15 shrink-0 bg-amber-100 rounded-full overflow-hidden'>
                <CircleUserRound className='h-full w-full scale-140 text-gray-600' strokeWidth={1} />
              </div>
              <p className=' text-lg'>Switch user</p>
            </button>
          </div>
        </motion.div>
      }
    </div>
  )
}

export default Signup