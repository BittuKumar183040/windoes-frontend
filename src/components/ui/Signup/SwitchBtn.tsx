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
				<div className='h-15 w-15 shrink-0 bg-amber-100 rounded-full overflow-hidden'>
					{imgSrc ? <img src={imgSrc} alt={label} />
						:
						<CircleUserRound className='h-full w-full scale-140 text-gray-600' strokeWidth={1} />
					}
				</div>
				<p className=' text-lg'>{label}</p>
			</button>
		}
	</>
	)
}

export default UserSwitch;