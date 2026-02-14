import type { RefAttributes, SVGProps, ForwardRefExoticComponent } from 'react';

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface LucideProps extends ElementAttributes {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
}
type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

interface ActionButtonsProps {
  label: string
  isDisabled?: boolean
  onClick?: () => void
  Icon?: LucideIcon
  iconProps? : LucideProps
  className?: string
}

export const ActionButtons = ({label, isDisabled, onClick, Icon, iconProps, className}: ActionButtonsProps) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={`flex text-lg items-center justify-between rounded-md gap-2 hover:bg-gray-100 p-3 px-6
      ${isDisabled && " pointer-events-none opacity-50"}
      ${className}`}>
      {Icon && <Icon size={iconProps?.size || 15} absoluteStrokeWidth={iconProps?.absoluteStrokeWidth} />}
      <p>{label}</p>
    </button>
  )
}
