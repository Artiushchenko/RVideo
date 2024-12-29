import { instance } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
import type { IVideoFormData } from '@/types/studio-video.types'
import type { IStudioVideoResponse, IVideosPagination } from '@/types/video.types'

class StudioVideoService {
	private _STUDIO_VIDEOS = '/studio/videos'

	async getAll(params?: IPaginationParams) {
		const data = await instance.get<IVideosPagination>(this._STUDIO_VIDEOS, {
			params
		})

		return data.data
	}

	byId(id: string) {
		return instance.get<IStudioVideoResponse>(`${this._STUDIO_VIDEOS}/${id}`)
	}

	create(dto: IVideoFormData) {
		return instance.post(this._STUDIO_VIDEOS, dto)
	}

	update(id: string, dto: IVideoFormData) {
		return instance.put(`${this._STUDIO_VIDEOS}/${id}`, dto)
	}

	delete(id: string) {
		return instance.delete(`${this._STUDIO_VIDEOS}/${id}`)
	}
}

export const studioVideoService = new StudioVideoService()
