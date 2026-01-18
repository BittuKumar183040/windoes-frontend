import { CircleUserRound } from 'lucide-react'

const UserSwitch = ({ Icon, label, onClick }: any) => {
	return (<>
		{label && 
			<button onClick={onClick} className=' bg-white/10 p-2 px-4 flex items-center gap-3 rounded-md'>
				<div className='h-15 w-15 shrink-0 bg-amber-100 rounded-full overflow-hidden'>
					<CircleUserRound className='h-full w-full scale-140 text-gray-600' strokeWidth={1} />
				</div>
				<p className=' text-lg'>{label}</p>
			</button>
		}
	</>
	)
}

export default UserSwitch;