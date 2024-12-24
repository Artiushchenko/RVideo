'use client'

import { Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { getTime } from '@/utils/video-player'

import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { EnumVideoPlayerQuality } from './video-player.types'
import { VolumeControl } from './volume/VolumeControl'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPlayerQuality
}

export function VideoPlayer({ fileName, toggleTheaterMode, maxResolution }: Props) {
	const { fn, playerRef, state } = useVideoPlayer({ fileName, toggleTheaterMode })

	return (
		<div className='relative rounded-2xl overflow-hidden mb-5'>
			<video
				ref={playerRef}
				className='aspect-video w-full'
				controls={false}
				src={`/uploads/videos/${EnumVideoPlayerQuality['1080p']}/${fileName}`}
				preload='metadata'
			/>

			<div className='grid grid-cols-[7fr_1fr] gap-7 absolute bottom-5 left-5 right-5'>
				<div className='flex items-center gap-6'>
					<button
						onClick={fn.togglePlayPause}
						className='transitions-colors hover:text-primary'
					>
						{state.isPlaying ? <Pause /> : <Play />}
					</button>

					<PlayerProgressBar
						currentTime={state.currentTime}
						duration={state.videoTime}
						progress={state.progress}
						onSeek={fn.onSeek}
					/>

					<div>
						<span>{getTime(state.videoTime)}</span>
					</div>
				</div>

				<div className='flex items-center gap-4'>
					<VolumeControl
						changeVolume={fn.changeVolume}
						toggleMute={fn.toggleMute}
						value={state.volume}
						isMuted={state.isMuted}
					/>

					<SelectQuality
						currentValue={state.quality}
						onChange={fn.changeQuality}
						maxResolution={maxResolution}
					/>

					<button
						onClick={toggleTheaterMode}
						className='transition-colors hover:text-primary'
					>
						<RectangleHorizontal />
					</button>

					<button
						onClick={fn.toggleFullScreen}
						className='transition-colors hover:text-primary'
					>
						<Maximize />
					</button>
				</div>
			</div>
		</div>
	)
}
