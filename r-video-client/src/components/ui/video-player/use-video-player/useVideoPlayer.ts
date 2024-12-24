import { useRef } from 'react'

import { type HTMLCustomVideoElement } from '../video-player.types'

import { useFullScreen } from './useFullScreen'
import { useOnSeek } from './useOnSeek'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoHotkeys } from './useVideoHotkeys'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
}

export function useVideoPlayer({ fileName, toggleTheaterMode }: Props) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef)
	const { currentTime, progress, videoTime, setCurrentTime } = useVideoProgress(playerRef)
	const { quality, changeQuality } = useVideoQuality(playerRef, {
		fileName,
		currentTime,
		setIsPlaying
	})
	const { toggleFullScreen } = useFullScreen(playerRef)
	const { skipTime } = useSkipTime(playerRef)
	const { volume, isMuted, changeVolume, toggleMute } = useVideoVolume(playerRef)
	const { onSeek } = useOnSeek(playerRef, setCurrentTime)

	const fn = {
		togglePlayPause,
		changeQuality,
		toggleFullScreen,
		skipTime,
		changeVolume,
		toggleMute,
		onSeek
	}

	useVideoHotkeys({ volume, toggleTheaterMode, ...fn })

	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality,
			volume,
			isMuted
		},
		fn,
		playerRef
	}
}
