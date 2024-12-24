import { useHotkeys } from 'react-hotkeys-hook'

import type { EnumVideoPlayerQuality } from '../video-player.types'

import type { TSkipTime } from './useSkipTime'

interface Props {
	togglePlayPause: () => void
	changeQuality: (quality: EnumVideoPlayerQuality) => void
	toggleFullScreen: () => void
	skipTime: (type?: TSkipTime) => void
	changeVolume: (value: number) => void
	toggleMute: () => void
	toggleTheaterMode: () => void
	volume: number
}

export function useVideoHotkeys({ volume, ...fn }: Props) {
	useHotkeys('space', e => {
		e.preventDefault()
		fn.togglePlayPause()
	})

	useHotkeys('left', () => {
		fn.skipTime('backward')
	})

	useHotkeys('right', () => {
		fn.skipTime('forward')
	})

	useHotkeys('up', e => {
		e.preventDefault()
		fn.changeVolume(Math.min(volume + 0.1, 1))
	})

	useHotkeys('down', e => {
		e.preventDefault()
		fn.changeVolume(Math.max(volume - 0.1, 0))
	})

	useHotkeys('m', () => {
		fn.toggleMute()
	})

	useHotkeys('f', () => {
		fn.toggleFullScreen()
	})

	useHotkeys('t', () => {
		fn.toggleTheaterMode()
	})
}
