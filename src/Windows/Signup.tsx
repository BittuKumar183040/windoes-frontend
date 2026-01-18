import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"
import background from "../assets/desktop_backgroud.jpg"
import { Grip } from 'lucide-react';
import backendAPI from '../components/utility/helper/apiRequestService';
import SwitchUser from '../components/ui/Signup/SwitchUser';
import UserSwitch from '../components/ui/Signup/SwitchBtn';
import TextInput from '../components/ui/input/TextInput';
import { ConfirmButton } from '../components/ui/input/Buttons';
import type { User } from '../types/User';

const Signup = () => {
  const navigate = useNavigate();
  const [isSliderLoaded, setIsSliderLoaded] = useState(true);
  const [isIncorrectPasswordState, setIsIncorrectPasswordState] = useState(false);
  const [password, setPassword] = useState("SecurePass123!");
  const [switchUser, setSwitchUser] = useState(false);

  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) { return JSON.parse(storedUser) }
    return { id: '', username: '', name: '', email: '' };
  });

  const handleSlideup = () => {
    setIsSliderLoaded(false)
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setSwitchUser(true);
    }
  }, []);

  const hitApi = async () => {
    try {
      const usernameOrEmail = user.username || user.email;
      const payload = { usernameOrEmail, password };

      const response = await backendAPI.post("/auth/login", payload);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUser(response.data.user)
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
    setSwitchUser(true);
  }

  const handleLoggedUser = async () => {
    setSwitchUser(false);
  }

  return (
    <div onContextMenu={(e) => e.preventDefault()} className='relative h-dvh w-full overflow-hidden'>
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
          {switchUser === false ?
            <div className=' flex flex-col gap-6 justify-between items-center h-fit'>
              <div className=' h-60 w-60 shrink-0 bg-amber-100 rounded-full'></div>
              <p className=' text-4xl font-bold tracking-wide'>{user.name}</p>
              {isIncorrectPasswordState ? <>
                <p className=' text-white text-lg'>The PIN is incorrect. Try again.</p>
                <ConfirmButton
                  onClick={() => setIsIncorrectPasswordState(false)}
                  label='OK'
                />
              </>
                : <>
                  <Grip size={50} />
                  <p className=' text-3xl'>Enter Your Pin</p>
                  <TextInput
                    type="text"
                    value={password}
                    onEnterPress={() => hitApi()}
                    onChange={(value: string) => setPassword(value)} placeholder='PIN'
                    autoFocus
                  />
                  <p className=' text-white/50 text-lg'>I forgot my pin </p>
                </>
              }
            </div>
            :
            <SwitchUser />
          }
          <div className=' absolute left-5 bottom-5 flex flex-col gap-1'>
            <UserSwitch label={user.name} onClick={handleLoggedUser} />
            <UserSwitch label="Switch User" onClick={handleSwitchUser} />
          </div>
        </motion.div>
      }
    </div>
  )
}

export default Signup