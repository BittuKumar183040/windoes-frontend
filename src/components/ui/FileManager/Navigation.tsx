import type { LucideIcon } from "lucide-react";
import { useFileManagerContext } from "../../../Applications/FileManager/FileManagerContextState";

interface ButtonProps {
  Icon: LucideIcon;
  className?: string;
  iconStyle?: string;
  isRoot?: boolean;
  onClick?: () => void;
}

const NavigationButton = ({ Icon, iconStyle, className, onClick, isRoot}: ButtonProps) => {

  const context = useFileManagerContext?.();
  const computedIsRoot = isRoot ?? (context?.location?.some(item => item.parentId === null) ?? false);

  return (
    <button
      disabled={computedIsRoot}
      onClick={onClick}
      className={`h-[32px] w-[32px] flex items-center justify-center rounded-md transition-colors 
      ${computedIsRoot ? "pointer-events-none opacity-50" : ""}
      ${className}`}
    >
      <Icon className={iconStyle} size={18} strokeWidth={1} />
    </button>
  );
};

export default NavigationButton;
