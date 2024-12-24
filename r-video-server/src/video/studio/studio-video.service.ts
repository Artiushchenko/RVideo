import { PrismaService } from '@/prisma.service'
import { nanoid } from 'nanoid'

import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CreateVideoDto, UpdateVideoDto } from '../dto/video.dto'

@Injectable()
export class StudioVideoService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(channelId: string, searchTerm?: string, page = 1, limit = 5) {
		const skip = (page - 1) * limit
		const whereCondition = this.buildWhereCondition(channelId, searchTerm)

		const videos = await this.getVideos(whereCondition, skip, limit)

		const totalCount = await this.prisma.video.count({
			where: whereCondition
		})

		return {
			videos,
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}

	async byId(id: string) {
		const video = await this.getVideoById(id)
		if (!video) throw new NotFoundException('Video not found')
		return video
	}

	async create(channelId: string, dto: CreateVideoDto) {
		const video = await this.createVideo(channelId, dto)
		return video.id
	}

	async update(id: string, dto: UpdateVideoDto) {
		const video = await this.updateVideo(id, dto)
		if (!video) throw new NotFoundException('Video not found')
		return video
	}

	async delete(id: string) {
		const video = await this.deleteVideo(id)
		if (!video) throw new NotFoundException('Video not found')
		return video
	}

	private buildWhereCondition(
		channelId: string,
		searchTerm?: string
	): Prisma.VideoWhereInput {
		return {
			channelId,
			...(searchTerm && {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			})
		}
	}

	private async getVideos(
		whereCondition: Prisma.VideoWhereInput,
		skip: number,
		take: number
	) {
		return this.prisma.video.findMany({
			where: whereCondition,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				channel: {
					include: {
						user: true
					}
				},
				tags: true,
				comments: true,
				likes: true
			},
			skip,
			take
		})
	}

	async getVideoById(id: string) {
		return this.prisma.video.findUnique({
			where: { id },
			include: {
				channel: true,
				tags: true,
				comments: true,
				likes: true
			}
		})
	}

	private async createVideo(channelId: string, dto: CreateVideoDto) {
		const { tags, ...videoData } = dto

		return this.prisma.video.create({
			data: {
				...videoData,
				publicId: nanoid(10),
				channel: {
					connect: { id: channelId }
				},
				isPublic: true,
				tags: tags?.length
					? {
							connectOrCreate: tags.map(tag => ({
								where: { name: tag },
								create: { name: tag }
							}))
						}
					: undefined
			}
		})
	}

	private async updateVideo(id: string, dto: UpdateVideoDto) {
		const { tags, ...videoData } = dto

		return this.prisma.video.update({
			where: { id },
			data: {
				...videoData,
				tags: tags?.length
					? {
							set: [],
							connectOrCreate: tags.map(tag => ({
								where: { name: tag },
								create: { name: tag }
							}))
						}
					: {
							set: []
						}
			}
		})
	}

	deleteVideo(id: string) {
		return this.prisma.video.delete({
			where: { id }
		})
	}
}
