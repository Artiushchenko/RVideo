import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	text: string

	@IsString()
	@IsNotEmpty()
	videoId: string
}

export type UpdateCommentDto = Partial<Omit<CreateCommentDto, 'videoId'>>
