import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsOptional,
	IsString
} from 'class-validator'
import { EnumVideoPlayerQuality } from './video.types'

export class CreateVideoDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	thumbnailUrl: string

	@IsString()
	videoFileName: string

	@IsOptional()
	@IsEnum(EnumVideoPlayerQuality)
	maxResolution?: EnumVideoPlayerQuality

	@IsOptional()
	@IsBoolean()
	isPublic?: boolean

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tags?: string[]
}

export type UpdateVideoDto = Partial<CreateVideoDto>
