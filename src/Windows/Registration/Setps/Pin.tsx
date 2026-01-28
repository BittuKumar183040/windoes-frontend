import { useState } from "react";
import TextInput from "../../../components/ui/input/TextInput";


const Pin = ({ onNext }: { onNext: () => void }) => {
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");

  const canProceed = !!pin && !!pinConfirm && pin === pinConfirm;

  return (
    <div className="relative flex flex-wrap h-full w-full">
      <div className="w-1/2 flex items-center justify-center opacity-80">
        <img src="/signup/terms.png" />
      </div>

      <div className="w-1/2 flex flex-col h-full gap-8 justify-center">
        <p className=' text-2xl font-bold text-black'>Setup you Pin</p>
        <div className="overflow-auto flex-1">

          <p className="text-md text-black/50">
            Make it yours with a unique name that's easy to recognize when connecting to it.
          </p>
          <div className="overflow-auto flex-1 mt-4 flex justify-end gap-4 flex-col">
            <TextInput
              value={pin}
              onChange={(val: string) => setPin(val)}
              placeholder="Enter Pin"
              autoFocus
              enableEnter={false}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.5)",
                color: "black",
                boxShadow: "0px 1px 0 rgb(23, 96, 253)",
              }}
              loaderStyle="text-black"
            />

            <TextInput
              value={pinConfirm}
              type="text"
              onChange={(val: string) => setPinConfirm(val)}
              placeholder="Enter Confirm Pin"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.5)",
                color: "black",
                boxShadow: "0px 1px 0 rgb(23, 96, 253)",
              }}
              loaderStyle="text-black"
            />
          </div>
        </div>

        <div className=' flex gap-4 justify-end'>
          <button className=' text-xl  text-blue-600' onClick={onNext}>Skip for now</button>
          <button
            disabled={!canProceed}
            className={`p-4 px-16 text-xl rounded-lg shadow-xl text-white font-medium
              ${canProceed
                ? "bg-linear-to-r from-blue-500 to-blue-600"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pin;
