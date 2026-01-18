import { ArrowBigRight, Loader } from "lucide-react";
import { forwardRef, type ChangeEventHandler, type HTMLInputTypeAttribute } from "react";

interface TextInputProps {
	type?: HTMLInputTypeAttribute | undefined;
	placeholder?: string | undefined;
	value?: string | readonly string[] | number | undefined;
	autoFocus?: boolean | undefined;
	isLoading?: boolean | undefined;
	isDisabled?: boolean | undefined;
	onEnterPress?: () => void;
	onChange?: (value: string) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((
	{ type = "text", placeholder, value, autoFocus, isLoading, isDisabled, onEnterPress, onChange }, ref
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
		<div className=" relative">
			<input
				ref={ref}
				type={type}
				value={value}
				onKeyDown={onKeyDown}
				disabled={isLoading || isDisabled}
				onChange={handleOnChange} placeholder={placeholder} autoFocus={autoFocus}
				className=' box-content text-xl border-2 bg-clip-padding rounded-md p-3 pr-11 w-96 outline-none transition-all
					border-white/10 border-b-gray-300 bg-white/10
					active:border-white/10 active:border-b-indigo-300 active:bg-gray-800/80
					focus:border-white/10 focus:border-b-indigo-300 focus:bg-gray-800/80
					'/>
			<div className=" absolute right-0 top-0 h-full flex items-center justify-center px-2">
				{value && !isLoading && <ArrowBigRight className=" p-1 opacity-80" onClick={() => onEnterPress?.()} />}
				{isLoading && <Loader className=" p-1 opacity-80 animate-spin" />}
			</div>
		</div>
	);
});


TextInput.displayName = "TextInput";

export default TextInput