import { UserProfileImage } from '../UserProfile';

interface UserSwitchProps {
	imgSrc?: string | null,
	label: string,
	onClick: () => void
}

const UserSwitch = ({ imgSrc, label, onClick }: UserSwitchProps) => {

	return (<>
		{label &&
			<button onClick={onClick} className=' bg-white/10 shadow p-2 px-4 flex items-center gap-3 rounded-md'>
				<UserProfileImage src={imgSrc} size={40} />
				<p className=' text-lg'>{label}</p>
			</button>
		}
	</>
	)
}

export default UserSwitch;