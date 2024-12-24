import { PrismaService } from '@/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ChannelService {
	constructor(private readonly prisma: PrismaService) {}

	async bySlug(slug: string) {
		const channel = await this.prisma.channel.findUnique({
			where: { slug },

			include: {
				user: true,

				videos: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						channel: {
							include: {
								user: true
							}
						}
					}
				},
				subscribers: true
			}
		})
		if (!channel) throw new NotFoundException('Channel not found')

		return channel
	}

	async getAll() {
		return this.prisma.channel.findMany()
	}

	async toggleSubscribe(slug: string, userId: string) {
		const channel = await this.prisma.channel.findUnique({
			where: { slug },
			select: { id: true }
		})
		if (!channel) throw new NotFoundException('Channel not found')

		const isSubscribed =
			(await this.prisma.user.count({
				where: {
					id: userId,
					subscriptions: {
						some: { id: channel.id }
					}
				}
			})) > 0

		if (isSubscribed) {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					subscriptions: {
						disconnect: { id: channel.id }
					}
				}
			})

			return { message: 'Unsubscribed successfully', isSubscribed: false }
		} else {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					subscriptions: {
						connect: { id: channel.id }
					}
				}
			})

			return { message: 'Subscribed successfully', isSubscribed: true }
		}
	}
}
