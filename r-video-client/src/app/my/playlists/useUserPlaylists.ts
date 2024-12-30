import { useQuery } from '@tanstack/react-query'

import { playlistService } from '@/services/playlist.service'

export function useUserPlaylists() {
	return useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})
}
