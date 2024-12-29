import { axiosClassic } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
import type { ISingleVideoResponse, IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	getAll(searchTerm?: string | null) {
		return axiosClassic.get<IVideosPagination>(
			this._VIDEOS,
			searchTerm
				? {
						params: { searchTerm }
					}
				: {}
		)
	}

	byPublicId(publicId?: string | null) {
		return axiosClassic.get<ISingleVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`)
	}

	async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || ''
		const { data } = await axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		})

		return data
	}

	getTrendingVideos() {
		return axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`)
	}

	getVideoGames() {
		return axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/games`)
	}

	updateViews(publicId: string) {
		return axiosClassic.put(`${this._VIDEOS}/update-views-count/${publicId}`)
	}
}

export const videoService = new VideoService()
