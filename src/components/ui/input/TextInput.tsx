import { ArrowBigRight, Loader } from "lucide-react";
import { forwardRef, type ChangeEventHandler, type CSSProperties, type HTMLInputTypeAttribute } from "react";

interface TextInputProps {
	type?: HTMLInputTypeAttribute | undefined;
	placeholder?: string | undefined;
	value?: string | readonly string[] | number | undefined;
	style?: CSSProperties;
	autoFocus?: boolean | undefined;
	isLoading?: boolean | undefined;
	isDisabled?: boolean | undefined;
	enableEnter?: boolean;
	loaderStyle?: string;
	onEnterPress?: () => void;
	onChange?: (value: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((
	{ type = "text", placeholder, value, style, autoFocus, isLoading, enableEnter=true, isDisabled, loaderStyle, onEnterPress, onChange }, ref
) => {

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		onChange?.(e.target.value)
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onEnterPress?.()
		}
	}

	return (
		<div className=" relative w-full">
			<input
				ref={ref}
				type={type}
				value={value}
				onKeyDown={onKeyDown}
				style={style}
				disabled={isLoading || isDisabled}
				onChange={handleOnChange} placeholder={placeholder} autoFocus={autoFocus}
				className={` text-xl w-full border-2 bg-clip-padding rounded-md p-3 outline-none transition-all
					border-white/10 border-b-gray-300 bg-white/10
					active:border-white/10 active:border-b-indigo-300 active:bg-gray-800/80
					focus:border-white/10 focus:border-b-indigo-300 focus:bg-gray-800/80
					${isLoading || isDisabled && "pointer-events-none"}
					${enableEnter && " pr-11 " }
					`}/>
			<div className=" absolute right-0 top-0 h-full flex items-center justify-center px-2">
				{enableEnter && value && !isLoading && <ArrowBigRight className=" p-1 opacity-80" onClick={() => onEnterPress?.()} />}
				{isLoading && <Loader className={` p-1 opacity-80 animate-spin ${loaderStyle}`} />}
			</div>
		</div>
	);
});


TextInput.displayName = "TextInput";

export default TextInput