import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePlaylistDto } from './dto/create-playlist.dto'

@Injectable()
export class PlaylistService {
	constructor(private readonly prisma: PrismaService) {}

	async getPlaylistById(playlistId: string) {
		const playlist = await this.prisma.playlist.findUnique({
			where: { id: playlistId },
			include: {
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
				}
			}
		})

		if (!playlist) {
			throw new NotFoundException('Плейлист не найден')
		}

		return playlist
	}

	async getUserPlaylists(userId: string) {
		const playlists = await this.prisma.playlist.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				videos: true
			}
		})
		return playlists
	}

	async toggleVideoInPlaylist(
		playlistId: string,
		videoId: string,
		userId: string
	) {
		const playlist = await this.prisma.playlist.findFirst({
			where: {
				id: playlistId,
				userId
			},
			include: {
				videos: true
			}
		})

		if (!playlist) {
			throw new NotFoundException('Плейлист не найден или недоступен')
		}

		const videoExists = await this.prisma.video.findUnique({
			where: { id: videoId }
		})

		if (!videoExists) {
			throw new NotFoundException('Видео не найдено')
		}

		const isVideoInPlaylist = playlist.videos.some(
			video => video.id === videoId
		)

		if (isVideoInPlaylist) {
			await this.prisma.playlist.update({
				where: { id: playlistId },
				data: {
					videos: {
						disconnect: { id: videoId }
					}
				}
			})
			return { message: 'Видео удалено из плейлиста' }
		} else {
			await this.prisma.playlist.update({
				where: { id: playlistId },
				data: {
					videos: {
						connect: { id: videoId }
					}
				}
			})
			return { message: 'Видео добавлено в плейлист' }
		}
	}

	async createPlaylist(userId: string, createPlaylistDto: CreatePlaylistDto) {
		const { title, videoPublicId } = createPlaylistDto

		let video = null

		if (videoPublicId) {
			video = await this.prisma.video.findUnique({
				where: { publicId: videoPublicId }
			})

			if (!video) {
				throw new NotFoundException('Видео не найдено')
			}
		}

		const playlist = await this.prisma.playlist.create({
			data: {
				title,
				userId,
				videos: video
					? {
							connect: { publicId: videoPublicId }
						}
					: undefined
			},
			include: {
				videos: true
			}
		})

		return playlist
	}
}
