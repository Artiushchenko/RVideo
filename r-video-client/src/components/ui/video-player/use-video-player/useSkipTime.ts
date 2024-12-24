import { type RefObject } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

const SKIP_TIME_SECONDS = 10

export type TSkipTime = 'forward' | 'backward'

export function useSkipTime(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const skipTime = (type?: TSkipTime) => {
		if (!playerRef.current?.currentTime) {
			return
		}

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}

	return { skipTime }
}
