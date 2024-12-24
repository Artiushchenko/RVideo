import { EnumVideoPlayerQuality } from '@/video/dto/video.types'

export interface IMediaResponse {
	url: string
	name: string
	maxResolution?: EnumVideoPlayerQuality
}

export interface IFile extends Express.Multer.File {
	name?: string
}
