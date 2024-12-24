import { IsNotEmpty, IsString } from 'class-validator'

export class ToggleVideoDto {
	@IsString()
	@IsNotEmpty()
	videoId: string
}
