import { PrismaService } from '@/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { omit } from 'lodash'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async byId(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				likes: {
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
				},
				channel: true,
				subscriptions: true
			}
		})
		if (!user) throw new NotFoundException('User not found')

		return omit(user, ['password'])
	}

	async getProfile(id: string) {
		const user = await this.byId(id)

		const subscribedVideos = await this.prisma.video.findMany({
			where: {
				channel: {
					subscribers: {
						some: {
							id: id
						}
					}
				}
			},
			include: {
				channel: {
					include: {
						user: true
					}
				},
				likes: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return {
			...user,
			subscribedVideos
		}
	}

	async updateProfile(
		id: string,
		{ channel, password, ...dto }: UpdateUserDto
	) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})
		if (!user) throw new NotFoundException('User not found')
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (isSameUser && String(id) !== String(isSameUser.id))
			throw new NotFoundException('Email busy')

		if (password) {
			const hashPassword = await hash(password)
			user.password = hashPassword
		}

		return this.prisma.user.update({
			where: { id },
			data: {
				password: user.password,
				...dto,
				channel: {
					upsert: {
						create: channel,
						update: channel
					}
				}
			}
		})
	}

	async getCount() {
		return this.prisma.user.count()
	}

	async getAll(searchTerm?: string) {
		return this.prisma.user.findMany({
			where: searchTerm
				? {
						email: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				: {},
			select: {
				email: true,
				createdAt: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async delete(id: string) {
		return this.prisma.user.delete({
			where: { id }
		})
	}

	async toggleLike(videoId: string, userId: string) {
		const videoExists = await this.prisma.video.findUnique({
			where: { id: videoId }
		})

		if (!videoExists) {
			throw new Error('Видео не найдено')
		}

		const isLiked = await this.prisma.videoLike.findFirst({
			where: {
				userId: userId,
				videoId: videoId
			}
		})

		if (isLiked) {
			return this.prisma.videoLike.delete({
				where: {
					id: isLiked.id
				}
			})
		}

		return this.prisma.videoLike.create({
			data: {
				userId: userId,
				videoId: videoId
			}
		})
	}
}
