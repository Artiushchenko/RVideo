import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePlaylistDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	videoPublicId: string
}
