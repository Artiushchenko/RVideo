import { instance } from '@/api/axios'

import type { IFullVideo } from '@/types/video.types'

class WatchHistoryService {
	private _WATCH_HISTORY = '/watch-history'

	getUserHistory() {
		return instance.get<{ video: IFullVideo }[]>(this._WATCH_HISTORY)
	}

	addToHistory(videoId: string) {
		return instance.post(this._WATCH_HISTORY, { videoId })
	}

	clearHistory() {
		return instance.delete(this._WATCH_HISTORY)
	}
}

export const watchHistoryService = new WatchHistoryService()
