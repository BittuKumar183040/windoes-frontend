import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"
import background from "../assets/desktop_backgroud.jpg"
import { CircleUserRound, Grip, UserRoundPlus } from 'lucide-react';
import SwitchUser from '../components/ui/Signup/SwitchUser';
import UserSwitch from '../components/ui/Signup/SwitchBtn';
import TextInput from '../components/ui/input/TextInput';
import { ConfirmButton } from '../components/ui/input/Buttons';
import type { User } from '../types/User';
import { login } from '../api/auth.api';
import { getUserProfileImage } from '../api/user.api';

const Signup = () => {
  const navigate = useNavigate();
  const [isSliderLoaded, setIsSliderLoaded] = useState(true);
  const [isIncorrectPasswordState, setIsIncorrectPasswordState] = useState(false);
  const [password, setPassword] = useState("SecurePass123!");
  const [switchUser, setSwitchUser] = useState(false);
  const [isLogoLoading, setLogoLoading] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

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
    if (user && user.id) {
      fetchLogo(user.id);
    }
  }, []);

  const loginUser = async () => {
    try {
      const usernameOrEmail = user.username || user.email;
      const payload = { usernameOrEmail, password };

      const data = await login(payload)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)
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

  const fetchLogo = async (id: string) => {
    if (!id) return;
    try {
      setLogoLoading(true);
      console.log("Fetching logo for User Id: ", id);
      const image = await getUserProfileImage(id);
      console.log("Found Logo for user id:", id, image)
      setLogo(image);

    } catch (error: unknown) {
      console.error('Failed to load profile image', error);
    } finally {
      setLogoLoading(false);
    }
  };
  const handleSwitchUser = async () => {
    setSwitchUser(true);
  }

  const handleLoggedUser = async () => {
    setSwitchUser(false);
  }

  const handleRegisterUser = () => {
    navigate('/register');
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
              <div className=' h-60 w-60 border-4 border-gray-100/20 bg-gray-100/20 shrink-0 rounded-full overflow-hidden'>
                { logo && !isLogoLoading ? (
                  <img src={logo} alt="Profile" className="h-full w-full object-cover" />
                ) :
                <CircleUserRound className='h-full w-full scale-140 text-gray-300' strokeWidth={0.5} />
              }
              </div>
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
                  <p className=' text-3xl'>Enter Your Password</p>
                  <TextInput
                    type="text"
                    value={password}
                    onEnterPress={() => loginUser()}
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
            <UserSwitch imgSrc={logo} label={user.name} onClick={handleLoggedUser} />
            <UserSwitch label="Switch User" onClick={handleSwitchUser} />
          </div>
          <div className=' absolute right-5 bottom-5 flex flex-col gap-1'>
            <button onClick={handleRegisterUser} className=' flex items-center text-white/80 gap-2 justify-between p-3 px-6 bg-white/10 rounded-md '>
              <UserRoundPlus size={15} />
              <p className=' text-md translate-y-px '>Register</p>
            </button>
          </div>
        </motion.div>
      }
    </div>
  )
}

export default Signup