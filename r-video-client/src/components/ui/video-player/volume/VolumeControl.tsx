import { Volume1, Volume2, VolumeX } from 'lucide-react'

interface Props {
	value: number
	isMuted: boolean
	changeVolume: (value: number) => void
	toggleMute: () => void
}

export function VolumeControl({ value, isMuted, changeVolume, toggleMute }: Props) {
	return (
		<div className='flex items-center gap-2'>
			<button
				onClick={toggleMute}
				className='transition-colors hover:text-primary'
			>
				{isMuted ? <VolumeX /> : value < 0.4 ? <Volume1 /> : <Volume2 />}
			</button>

			<input
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={value}
				onChange={e => changeVolume(parseFloat(e.target.value))}
				className='volume-slider w-12 h-[0.2rem] appearance-none bg-white rounded-lg cursor-pointer transition-all opacity-90 hover:opacity-100'
				style={{
					background: `linear-gradient(to right, white ${value * 100}%, rgba(255, 255, 255, 0.2) ${value * 100}%)`
				}}
			/>
		</div>
	)
}
