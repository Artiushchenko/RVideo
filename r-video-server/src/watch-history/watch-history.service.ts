import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WatchHistoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getByUserId(userId: string) {
		return this.prisma.watchHistory.findMany({
			where: { userId },
			orderBy: {
				watchedAt: 'desc'
			},
			include: {
				video: {
					include: {
						channel: {
							include: {
								user: true
							}
						}
					}
				}
			}
		})
	}

	async addToHistory(userId: string, videoId: string) {
		return this.prisma.watchHistory.upsert({
			where: {
				userId_videoId: {
					userId,
					videoId
				}
			},
			update: {
				watchedAt: new Date()
			},
			create: {
				userId,
				videoId,
				watchedAt: new Date()
			}
		})
	}

	async clearHistory(userId: string) {
		return this.prisma.watchHistory.deleteMany({
			where: { userId }
		})
	}
}
