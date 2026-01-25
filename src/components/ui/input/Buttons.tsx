import type { MouseEventHandler } from "react";

interface ConfirmButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ConfirmButton = ({ label, onClick }: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=' p-2 px-14 bg-white/20 rounded-md  text-xl border-transparent border-2 hover:border-white active:border-white '>
      {label}
    </button>
  )
}

interface ButtonProps {
  label: string;
  type: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({ label, type = "primary", onClick }: ButtonProps) => {
  return (<button
    onClick={onClick}
    className={` text-md py-2 px-4 rounded-lg flex items-center justify-center
      ${type === "primary" && ` bg-black text-white hover:bg-gray-800`}
      ${type === "secondary" && ` border border-gray-300`}
      `
    }
  >
    {label}
  </button>
  )
}

interface ButtonBarProps {
  Logo: React.ComponentType<{ strokeWidth?: number }>;
  label: string;
  buttonLabel: string;
  type?: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ButtonBar = ({ Logo, label, buttonLabel, type = "primary", onClick }: ButtonBarProps) => {
  return (<div className=" flex justify-between p-4 rounded-lg border border-gray-300 items-center bg-white/30">
    <div className=" flex gap-5 items-center justify-between"><Logo strokeWidth={1.1} /><p>{label}</p></div>
    <button onClick={onClick}
      className="w-35 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white/10 hover:bg-white/20 transition-all"
    > {buttonLabel}
    </button>
  </div>
  )
}