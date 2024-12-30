class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	VIDEO_GAMES = '/video-games'
	SUBSCRIPTIONS = '/my/subscriptions'

	MY_CHANNEL = '/my-channel'
	HISTORY = '/my/history'
	LIKED_VIDEOS = '/my/liked-videos'

	FEEDBACK = '/feedback'

	VIDEO(path: string) {
		return `/v/${path}`
	}

	CHANNEL(path: string) {
		return `/c/${path}`
	}

	PLAYLISTS(path?: string) {
		return `/my/playlists${path ? `/${path}` : ''}`
	}

	SEARCH(searchTerm: string) {
		return `/s?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
