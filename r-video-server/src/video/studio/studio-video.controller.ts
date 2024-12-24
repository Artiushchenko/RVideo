import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'

import { PaginationQueryDto } from '@/dto/pagination.dto'
import { CurrentUser } from '@/user/decorators/user.decorator'
import { Channel } from '@prisma/client'
import { CreateVideoDto, UpdateVideoDto } from '../dto/video.dto'
import { StudioVideoService } from './studio-video.service'

@Controller('/studio/videos')
export class StudioVideoController {
	constructor(private readonly studioVideoService: StudioVideoService) {}

	@Get()
	@Auth()
	async getAll(
		@CurrentUser('channel') channel: Channel,
		@Query() { limit, page, searchTerm }: PaginationQueryDto
	) {
		return this.studioVideoService.getAll(channel.id, searchTerm, page, limit)
	}

	@Get(':id')
	@Auth()
	async get(@Param('id') id: string) {
		return this.studioVideoService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth()
	async create(
		@CurrentUser('channel') channel: Channel,
		@Body() dto: CreateVideoDto
	) {
		return this.studioVideoService.create(channel.id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth()
	async update(@Param('id') id: string, @Body() dto: UpdateVideoDto) {
		return this.studioVideoService.update(id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth()
	async delete(@Param('id') id: string) {
		return this.studioVideoService.delete(id)
	}
}
