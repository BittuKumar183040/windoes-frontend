import type { MouseEventHandler } from "react";

interface ConfirmButtonProps {
  label: string;
  onClick?: MouseEventHandler<T> | undefined;
}

export const ConfirmButton = ({label, onClick}: ConfirmButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=' p-2 px-14 bg-white/20 rounded-md  text-xl border-transparent border-2 hover:border-white active:border-white '>
      {label}
    </button>
  )
}
