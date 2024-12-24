import type { IVideo } from './video.types'

export interface IMain {
	videos: IVideo[]
	page: number
	limit: number
	totalCount: number
	totalPages: number
}
