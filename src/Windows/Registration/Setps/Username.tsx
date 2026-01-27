import { ArrowBigLeft } from "lucide-react";
import type { RegistrationStepProps } from "../registrationSteps";
import TextInput from "../../../components/ui/input/TextInput";
import { useEffect, useMemo, useState } from "react";
import { checkUserExistance } from "../../../api/user.api";

type Condition = {
  condition: string;
  regex: RegExp;
};

const conditions: Condition[] = [
  { condition: "At least 4 characters", regex: /^.{4,}$/ },
  { condition: "Can't contain only numbers", regex: /^(?!\d+$).+/ },
  { condition: "No more than 15 characters", regex: /^.{1,15}$/ },
  {
    condition:
      "No spaces or special characters other than hyphen ( - ), dashes ( — and – ), and underscore ( _ )",
    regex: /^[a-zA-Z0-9_\-—–]+$/,
  },
];

const Username = ({ onNext, onPrev }: RegistrationStepProps) => {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const conditionStatus = useMemo(
    () =>
      conditions.map((c) => ({
        ...c,
        valid: c.regex.test(username),
      })),
    [username]
  );

  const isAllValid = conditionStatus.every((c) => c.valid);

  useEffect(() => {
    if (!isAllValid) {
      setIsAvailable(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsChecking(true);
        const available = await checkUserExistance(username);
        setIsAvailable(available);
      } catch (error) {
        console.error("Username check failed", error);
        setIsAvailable(null);
      } finally {
        setIsChecking(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [username, isAllValid]);

  const handleChange = (val: string) => {
    setUsername(val);
  };

  const handleConfirmUsername = () => {
    localStorage.setItem("register_username", username);
    onNext();
  }

  const canProceed = isAllValid && isAvailable === true;

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
          Let's name your device
        </p>

        <p className="text-md text-black/50">
          Make it yours with a unique name that's easy to recognize when connecting to it.
        </p>
        <div className="overflow-auto flex-1 flex justify-end gap-4 flex-col mb-14">
          <TextInput
            value={username}
            onChange={handleChange}
            placeholder="Enter Username"
            autoFocus
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.5)",
              color: "black",
              boxShadow: "0px 1px 0 rgb(23, 96, 253)",
            }}
            loaderStyle="text-black"
          />

          <div className="flex flex-col gap-2 text-sm">
            {conditionStatus.map((c) => (
              <div key={c.condition} className="flex items-center gap-2">
                <p className={c.valid ? "text-green-700" : "text-black/60"}>
                  {c.condition}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            {isAllValid && isAvailable !== null && (
              <p className={`text-sm font-semibold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                {isChecking ? null : isAvailable ? null : "Username already taken"}
              </p>
            )}
          </div>

          <button
            disabled={!canProceed}
            className={`p-4 px-16 text-xl rounded-lg shadow-xl text-white font-medium
              ${canProceed
                ? "bg-linear-to-r from-blue-500 to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleConfirmUsername}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Username;
