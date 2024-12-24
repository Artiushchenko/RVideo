import { PrismaService } from '@/prisma.service'
import { shuffle } from 'lodash'

import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Video, VideoTag } from '@prisma/client'

@Injectable()
export class VideoService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(searchTerm?: string, page = 1, limit = 10) {
		const skip = (page - 1) * limit
		const whereCondition = this.buildWhereCondition(searchTerm)

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

	private buildWhereCondition(searchTerm?: string): Prisma.VideoWhereInput {
		return {
			isPublic: true,
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
					},
					{
						tags: {
							some: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						}
					},
					{
						channel: {
							user: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
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

	async getVideoByPublicId(publicId: string) {
		const video = await this.findVideoByPublicId(publicId)

		if (!video) {
			throw new NotFoundException('Video not found')
		}

		const similarVideos = await this.getSimilarVideos(video)

		return {
			...video,
			similarVideos
		}
	}

	private async findVideoByPublicId(publicId: string) {
		return this.prisma.video.findUnique({
			where: { publicId },
			include: {
				channel: {
					include: {
						subscribers: true,
						user: true
					}
				},
				tags: true,
				likes: true,
				comments: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						user: {
							include: {
								channel: true
							}
						}
					}
				}
			}
		})
	}

	async getRecommendations(
		userId?: string,
		page = 1,
		limit = 30,
		excludeIds: string[] = []
	) {
		if (userId) {
			return this.getPersonalizedRecommendations(
				userId,
				page,
				limit,
				excludeIds
			)
		} else {
			return this.getGeneralRecommendations(page, limit, excludeIds)
		}
	}

	private async getPersonalizedRecommendations(
		userId: string,
		page: number,
		limit: number,
		excludeIds: string[]
	) {
		const skip = (page - 1) * limit

		const [watchedVideos, likedVideos, subscriptions] = await Promise.all([
			this.prisma.watchHistory.findMany({
				where: { userId },
				select: { videoId: true }
			}),
			this.prisma.videoLike.findMany({
				where: { userId },
				select: { videoId: true }
			}),
			this.prisma.user.findUnique({
				where: { id: userId },
				select: {
					subscriptions: {
						select: { id: true }
					}
				}
			})
		])

		const interactedVideoIds = [
			...new Set([
				...watchedVideos.map(wv => wv.videoId),
				...likedVideos.map(lv => lv.videoId)
			])
		]

		const subscriptionChannelIds =
			subscriptions?.subscriptions.map(sub => sub.id) || []

		const [tags, titleWords] = await Promise.all([
			this.prisma.videoTag.findMany({
				where: {
					videos: {
						some: {
							id: { in: interactedVideoIds }
						}
					}
				},
				select: { id: true }
			}),
			this.getTitleWordsFromVideos(interactedVideoIds)
		])

		const tagIds = tags.map(tag => tag.id)

		let totalCount = await this.prisma.video.count({
			where: {
				isPublic: true,
				id: { notIn: excludeIds },
				OR: [
					{ tags: { some: { id: { in: tagIds } } } },
					{ channelId: { in: subscriptionChannelIds } },
					...titleWords.map(word => ({
						title: { contains: word, mode: Prisma.QueryMode.insensitive }
					}))
				]
			}
		})

		let recommendedVideos = await this.prisma.video.findMany({
			where: {
				isPublic: true,
				id: { notIn: [...interactedVideoIds, ...excludeIds] },
				OR: [
					{
						tags: { some: { id: { in: tagIds } } }
					},
					{
						channelId: { in: subscriptionChannelIds }
					},
					...titleWords.map(word => ({
						title: { contains: word, mode: Prisma.QueryMode.insensitive }
					}))
				]
			},
			include: {
				channel: { include: { user: true } },
				tags: true
			},
			orderBy: { createdAt: 'desc' },
			skip,
			take: limit
		})

		// Если недостаточно рекомендованных видео, добавляем дополнительные

		if (recommendedVideos.length < limit) {
			const additionalLimit = limit - recommendedVideos.length
			const additionalVideos = await this.getGeneralRecommendations(
				1,
				additionalLimit,
				[...excludeIds, ...recommendedVideos.map(video => video.id)]
			)

			recommendedVideos = recommendedVideos.concat(additionalVideos.videos)
		}
		return {
			videos: recommendedVideos,
			page,
			limit,
			totalCount,
			totalPages: Math.round(totalCount / limit)
		}
	}

	private async getGeneralRecommendations(
		page: number,
		limit: number,
		excludeIds: string[] = []
	) {
		const skip = (page - 1) * limit

		const totalVideoCount = await this.prisma.video.count({
			where: {
				isPublic: true
			}
		})

		const videos = await this.prisma.video.findMany({
			where: {
				isPublic: true,
				id: { notIn: excludeIds }
			},
			include: {
				channel: { include: { user: true } },
				tags: true
			},
			orderBy: { createdAt: 'desc' },
			skip,
			take: limit
		})

		console.log(
			(
				await this.prisma.video.findMany({
					where: {
						isPublic: true,
						id: { notIn: excludeIds }
					},
					include: {
						channel: { include: { user: true } },
						tags: true
					},
					orderBy: { createdAt: 'desc' },
					skip,
					take: limit
				})
			).length
		)

		return {
			videos,
			page,
			limit,
			totalCount: totalVideoCount,
			totalPages: Math.round(totalVideoCount / limit)
		}
	}

	private async getTitleWordsFromVideos(videoIds: string[]): Promise<string[]> {
		const videos = await this.prisma.video.findMany({
			where: { id: { in: videoIds } },
			select: { title: true }
		})

		const titleWords = videos.flatMap(video =>
			this.extractTitleWords(video.title)
		)
		return Array.from(new Set(titleWords))
	}

	private async getSimilarVideos(video: Video & { tags: VideoTag[] }) {
		const tagIds = video.tags.map(tag => tag.id)
		const titleWords = this.extractTitleWords(video.title)

		const similarVideos = await this.prisma.video.findMany({
			where: {
				id: {
					not: video.id
				},
				isPublic: true,
				OR: [
					{
						tags: {
							some: {
								id: {
									in: tagIds
								}
							}
						}
					},
					{
						channelId: video.channelId
					},
					...titleWords.map(word => ({
						title: {
							contains: word,
							mode: Prisma.QueryMode.insensitive
						}
					})),
					{
						tags: {
							some: {
								name: {
									in: titleWords,
									mode: Prisma.QueryMode.insensitive
								}
							}
						}
					}
				]
			},
			include: {
				channel: {
					include: {
						user: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			take: 6
		})

		return shuffle(similarVideos)
	}

	private extractTitleWords(title: string): string[] {
		return title
			.toLowerCase()
			.split(' ')
			.map(word => word.trim())
			.filter(word => word.length > 2)
	}

	async byChannel(channelId: string, page = 1, limit = 10) {
		const skip = (page - 1) * limit

		const videos = await this.prisma.video.findMany({
			where: {
				channelId,
				isPublic: true
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				channel: {
					include: {
						user: true
					}
				}
			},
			skip,
			take: limit
		})

		const totalCount = await this.prisma.video.count({
			where: {
				channelId,
				isPublic: true
			}
		})

		return {
			videos,
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}

	async getTrendingVideos() {
		const oneWeekAgo = new Date()
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

		const recentVideos = await this.prisma.video.findMany({
			where: {
				isPublic: true,
				createdAt: {
					gte: oneWeekAgo
				}
			},
			include: {
				tags: true,
				likes: true,
				comments: true,
				channel: {
					include: {
						user: true
					}
				}
			}
		})

		const videosWithScore = recentVideos.map(video => {
			const hoursSincePublished =
				(new Date().getTime() - video.createdAt.getTime()) / (1000 * 60 * 60)
			const engagementScore =
				(video.viewsCount * 1 +
					video.likes.length * 2 +
					video.comments.length * 3) /
				Math.pow(hoursSincePublished + 2, 1.5)

			return {
				...video,
				engagementScore
			}
		})

		videosWithScore.sort((a, b) => b.engagementScore - a.engagementScore)

		let trendingVideos = videosWithScore.slice(0, 5)

		if (trendingVideos.length < 5) {
			const needed = 5 - trendingVideos.length

			const additionalVideos = await this.prisma.video.findMany({
				where: {
					isPublic: true,
					id: {
						notIn: trendingVideos.map(video => video.id)
					}
				},
				orderBy: {
					viewsCount: 'desc'
				},
				include: {
					tags: true,
					likes: true,
					comments: true,
					channel: {
						include: {
							user: true
						}
					}
				},
				take: needed
			})

			trendingVideos = trendingVideos.concat(
				additionalVideos.map(video => ({
					...video,
					engagementScore: 0
				}))
			)
		}

		return trendingVideos
	}

	async updateViewsCount(publicId: string) {
		const video = await this.prisma.video.update({
			where: { publicId },
			data: {
				viewsCount: {
					increment: 1
				}
			}
		})

		if (!video) throw new NotFoundException('Video not found')

		return video
	}
}
