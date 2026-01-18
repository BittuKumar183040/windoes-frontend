import { useEffect, useRef, useState } from "react"
import TextInput from "../input/TextInput";
import { isAxiosError } from "axios";
import type { User } from "../../../types/User";
import { useNavigate } from "react-router-dom";
import { getUserByKeyword } from "../../../api/user.api";
import { login } from "../../../api/auth.api";

const SwitchUser = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);

  const checkUserExists = async (keyword: string) => {
    if (keyword.length < 1) { return 0 }
    try {

      setIsLoading(true)
      const data = await getUserByKeyword(keyword)
      setErrorMsg(null);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data))

    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log(error.response?.data?.error?.message ?? error.response?.data?.error ?? error.message);
        setErrorMsg(error.response?.data?.error?.message ?? error.response?.data?.error ?? error.message);
      } else {
        console.log("User not Found | Server Issue", error);
        setErrorMsg("User not Found | Server Issue")
      }
    } finally {
      setIsLoading(false);
    }
  }

  const loginWithCred = async () => {
    try {
      setIsLoading(true)
      const payload = { usernameOrEmail, password };
      const data = await login(payload)
      console.log(data)
      setErrorMsg(null);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate('/desktop')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.log(error.response?.data?.error?.message ?? error.response?.data?.error ?? error.message);
        setErrorMsg(error.response?.data?.error?.message ?? error.response?.data?.error ?? error.message);
      } else {
        console.log("User not Found | Server Issue", error);
        setErrorMsg("User not Found | Server Issue")
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) {
      passwordRef.current?.focus();
    }
  }, [user]);

  const handleUsernameOrEmailChange = (value: string) => {
    setUsernameOrEmail(value);
    setErrorMsg(null);
  }

  const handlePasswordEnter = (password: string) => {
    setPassword(password);
    setErrorMsg(null);
  }

  return (
    <div className=' flex flex-col gap-6 justify-between items-center h-fit'>
      <div className=' h-60 w-60 shrink-0 bg-amber-100 rounded-full'></div>
      <p className=' text-4xl font-bold tracking-wide'>{user ? user?.name : "Switch User"}</p>
      {<p className={` text-red-300 ${errorMsg ? "block" : " invisible"}`}>Error: {errorMsg}</p>}

      {!(user?.email || user?.username) ?
        <TextInput
          placeholder="Enter Username or Email"
          value={usernameOrEmail}
          isLoading={isLoading}
          onEnterPress={() => checkUserExists(usernameOrEmail)}
          onChange={handleUsernameOrEmailChange}
          autoFocus
        />
        :
        <TextInput
          ref={passwordRef}
          type="text"
          placeholder={`Enter Password for ${user?.name}`}
          value={password}
          isLoading={isLoading}
          onEnterPress={() => loginWithCred()}
          onChange={handlePasswordEnter}
        />
      }

    </div>
  )
}

export default SwitchUser
