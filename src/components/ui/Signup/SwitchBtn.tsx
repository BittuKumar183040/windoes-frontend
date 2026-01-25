import { CircleUserRound } from 'lucide-react';

interface UserSwitchProps {
	imgSrc?: string | null,
	label: string,
	onClick: () => void
}

const UserSwitch = ({ imgSrc, label, onClick }: UserSwitchProps) => {

	return (<>
		{label &&
			<button onClick={onClick} className=' bg-white/10 p-2 px-4 flex items-center gap-3 rounded-md'>
				<div className='h-15 w-15 border-2 border-gray-100/30 shrink-0 bg-gray-100/20 rounded-full overflow-hidden'>
					{imgSrc ? <img className='h-full w-full object-cover' src={imgSrc} alt={label} />
						:
						<CircleUserRound className='h-full w-full scale-140 text-gray-200/50' strokeWidth={0.5} />
					}
				</div>
				<p className=' text-lg'>{label}</p>
			</button>
		}
	</>
	)
}

export default UserSwitch;