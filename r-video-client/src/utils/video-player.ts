import type { HTMLCustomVideoElement } from '@/ui/video-player/video-player.types'

export const getVideoInfo = (video: HTMLCustomVideoElement | null) => {
	const currentTime = video?.currentTime || 0
	const originalTime = video?.duration || 1

	return {
		currentTime,
		originalTime,
		progress: originalTime > 0 ? (currentTime / originalTime) * 100 : 0
	}
}

export const getTime = (time: number) => {
	return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
}
