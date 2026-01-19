import { useMemo, useState } from "react";
import type { RegistrationStepProps } from "../registrationSteps";
import { ArrowBigLeft } from "lucide-react";
import TextInput from "../../../components/ui/input/TextInput";
import type { UserRegistrationPayload } from "../../../types/User";
import { registerUser } from "../../../api/user.api";
import axios from "axios";

type Condition = {
  condition: string;
  regex: RegExp;
};

const conditions: Condition[] = [
  { condition: "At least 4 characters", regex: /^.{4,}$/ },
  { condition: "At least one special character (@, _, etc.)", regex: /[@_$&^!*%#]/ },
  { condition: "No more than 12 characters", regex: /^.{1,12}$/ },
];

const Credentials = ({ onNext, onPrev }: RegistrationStepProps) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regError, setRegError] = useState<string | null>(null);

  const [user, setUser] = useState<UserRegistrationPayload>({
    username: localStorage.getItem("register_username") ?? "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: keyof typeof user, value: string) => {
    setRegError(null);
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const conditionStatus = useMemo(
    () =>
      conditions.map(c => ({
        ...c,
        valid: c.regex.test(user.password),
      })),
    [user.password]
  );

  const isPasswordValid = useMemo(
    () => conditionStatus.every(c => c.valid),
    [conditionStatus]
  );

  const isNameValid = useMemo(
    () => user.name.trim().length > 0,
    [user.name]
  );

  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email),
    [user.email]
  );

  const isConfirmPasswordValid = useMemo(
    () =>
      user.password.length > 0 &&
      user.password === confirmPassword,
    [user.password, confirmPassword]
  );

  const canProceed = useMemo(
    () =>
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid,
    [
      isNameValid,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
    ]
  );

  const handleRegistration = async () => {
    console.log("first")
    try {
      const regUser = await registerUser(user)
      console.log(regUser)
      onNext();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.error ||
          e.response?.data?.detail ||
          "Registration failed";
        setRegError(message);
      } else {
        setRegError("Something went wrong");
      }
    }
  }

  const isDisabled = !canProceed || regError !== null;

  return (
    <div className="relative flex h-full w-full">
      <button
        className="absolute left-0 top-0 z-10 flex items-center gap-2 text-black/50 shadow-sm bg-white/20 p-2 px-4 rounded-xl"
        onClick={onPrev}
      >
        <ArrowBigLeft size={20} strokeWidth={2} />
        <p className="text-xl font-bold">Back</p>
      </button>

      <div className="w-1/2 flex items-center justify-center">
        <img src="/signup/username.png" alt="Username Illustration" />
      </div>

      <div className="w-1/2 flex flex-col h-full gap-6 justify-center">
        <p className="text-2xl font-bold text-black">
          Let's create your Windows account
        </p>

        <p className="text-md text-black/50">
          Make it yours with a unique name that's easy to recognize when connecting to it.
        </p>
        <div className="overflow-auto overflow-x-auto flex-1 flex justify-end gap-4 flex-col">
          <TextInput
            value={user.name}
            onChange={(val: string) => handleChange("name", val)}
            placeholder="Enter Full Name"
            autoFocus
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.5)",
              color: "black",
              boxShadow: "0px 1px 0 rgb(23, 96, 253)",
            }}
            loaderStyle="text-black"
          />

          <TextInput
            value={user.email}
            type="email"
            onChange={(val: string) => handleChange("email", val)}
            placeholder="Enter Email"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.5)",
              color: "black",
              boxShadow: "0px 1px 0 rgb(23, 96, 253)",
            }}
            loaderStyle="text-black"
          />

          <TextInput
            value={user.password}
            type="password"
            onChange={(val: string) => handleChange("password", val)}
            placeholder="Enter Password"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.5)",
              color: "black",
              boxShadow: "0px 1px 0 rgb(23, 96, 253)",
            }}
            loaderStyle="text-black"
          />

          <TextInput
            value={confirmPassword}
            type="password"
            onChange={(val: string) => setConfirmPassword(val)}
            placeholder="Confirm Password"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.5)",
              color: "black",
              boxShadow: "0px 1px 0 rgb(23, 96, 253)",
            }}
            loaderStyle="text-black"
          />

          <div className="flex flex-col gap-2 text-md">
            {conditionStatus.map(c => (
              <p
                key={c.condition}
                className={c.valid ? "text-green-700" : "text-red-700/50"}
              >
                {c.condition}
              </p>
            ))}
            <p className={`text-red-700/50 ${!isConfirmPasswordValid && confirmPassword ? "" : "invisible"}`}>
              Passwords do not match
            </p>
          </div>
        </div>

        <div className={` flex max-h-14 overflow-auto px-2 w-full text-lg ${regError ? "bg-white/50 text-red-800 rounded-lg" : "invisible"} `}>
          <p>{regError}</p>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            disabled={isDisabled}
            className={`p-4 px-16 text-xl rounded-lg shadow-xl text-white font-medium
              ${isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-blue-500 to-blue-600"
              }`}
            onClick={handleRegistration}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
