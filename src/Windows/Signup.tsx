import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"
import background from "../assets/desktop_backgroud.jpg"
import { Grip, UserRoundPlus } from 'lucide-react';
import SwitchUser from '../components/ui/Signup/SwitchUser';
import UserSwitch from '../components/ui/Signup/SwitchBtn';
import TextInput from '../components/ui/input/TextInput';
import { ConfirmButton } from '../components/ui/input/Buttons';
import type { User } from '../types/User';
import { login } from '../api/auth.api';
import { getUserProfileImage } from '../api/user.api';
import { UserProfileImage } from '../components/ui/UserProfile';
import SliderContent from '../components/ui/Signup/Slider';
import { getUserFromLocal } from '../components/utility/helper/localstorage';

const Signup = () => {
  const navigate = useNavigate();
  const [isSliderLoaded, setIsSliderLoaded] = useState(true);
  const [isIncorrectPasswordState, setIsIncorrectPasswordState] = useState(false);
  const [password, setPassword] = useState("");
  const [switchUser, setSwitchUser] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLogoLoading, setLogoLoading] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  const [user, setUser] = useState<User>(() => {
    const storedUser = getUserFromLocal();
    if (storedUser) { return storedUser }
    return { id: '', username: '', name: '', email: '' };
  });

  const handleSlideup = () => {
    setIsSliderLoaded(false)
  }

  useEffect(() => {
    if (!getUserFromLocal()) {
      setSwitchUser(true);
    }
    if (user && user.id) {
      fetchLogo(user.id);
    }
  }, []);

  const loginUser = async () => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
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
        { isSliderLoaded && <SliderContent /> }
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
              <UserProfileImage src={logo} size={200} loading={isLogoLoading} />
              <p className=' text-4xl font-bold tracking-wide'>{user.name}</p>
              {isIncorrectPasswordState ? <>
                <p className=' text-white text-lg'>The Password is incorrect. Try again.</p>
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
                    isLoading={isLoading}
                    onChange={(value: string) => setPassword(value)} placeholder='Password'
                    autoFocus
                  />
                  <p className=' text-white/50 text-lg hidden'>I forgot my Password </p>
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
            <button onClick={handleRegisterUser} className=' flex items-center text-white gap-2 justify-between p-3 px-6 bg-white/20 shadow rounded-md '>
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