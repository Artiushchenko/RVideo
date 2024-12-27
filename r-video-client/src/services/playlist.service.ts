import { instance } from '@/api/axios'

import type { IPlaylist, IPlaylistData } from '@/types/playlist.types'

class PlaylistService {
	private _PLAYLISTS = '/playlists'

	getUserPlaylists() {
		return instance.get<IPlaylist[]>(this._PLAYLISTS)
	}

	getPlaylistById(playlistId: string) {
		return instance.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`)
	}

	toggleVideoInPlaylist(playlistId: string, videoId: string) {
		return instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {
			videoId
		})
	}

	createPlaylist(playlist: IPlaylistData) {
		return instance.post(this._PLAYLISTS, playlist)
	}
}

export const playlistService = new PlaylistService()
