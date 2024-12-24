import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator'

export class CreateChannelDto {
	@IsString()
	slug: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	avatarUrl?: string

	@IsOptional()
	@IsString()
	bannerUrl?: string
}

export class CreateUserDto {
	@IsString()
	name?: string

	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	password?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => CreateChannelDto)
	channel?: CreateChannelDto
}

export type UpdateUserDto = Partial<CreateUserDto>
