import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  Icon: LucideIcon;
  className?: string;
  iconStyle?: string;
}

const ActionButton = ({ Icon, iconStyle, className }: ButtonProps) => {
  return (
    <button className={`h-[32px] w-[32px] flex bg-transparent items-center justify-center text-black rounded-md hover:bg-[#eee] transition-colors ${className}`}>
      <Icon className={` ${iconStyle}`} size={18} strokeWidth={1} />
    </button>
  );
};

export default ActionButton;
