import { Controller, Get, HttpCode, Param, Put, Query } from '@nestjs/common'

import { PaginationQueryDto } from '@/dto/pagination.dto'
import { VideoService } from './video.service'

@Controller('videos')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('by-publicId/:publicId')
	async getVideoByPublicId(@Param('publicId') publicId: string) {
		return this.videoService.getVideoByPublicId(publicId)
	}

	@Get('by-channel/:channelId')
	async byChannel(
		@Param('channelId') channelId: string,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const { page, limit } = paginationQuery
		return this.videoService.byChannel(channelId, page, limit)
	}

	@Get()
	async getAll(@Query() paginationQuery: PaginationQueryDto) {
		const { page, limit, searchTerm } = paginationQuery
		return this.videoService.getAll(searchTerm, page, limit)
	}

	@Get('games')
	async getVideoGames() {
		return this.videoService.getAll('game')
	}

	@Get('trending')
	async getTrending() {
		return this.videoService.getTrendingVideos()
	}

	@Get('explore')
	async getExplore(
		@Query() paginationQuery: PaginationQueryDto,
		@Query('userId') userId?: string,
		@Query('excludeIds') excludeIds?: string
	) {
		const excludeIdArray = excludeIds ? excludeIds.split(',') : []
		const { page, limit } = paginationQuery
		return this.videoService.getRecommendations(
			userId,
			page,
			limit,
			excludeIdArray
		)
	}

	@Put('update-views-count/:publicId')
	@HttpCode(200)
	async updateViewsCount(@Param('publicId') publicId: string) {
		return this.videoService.updateViewsCount(publicId)
	}
}
