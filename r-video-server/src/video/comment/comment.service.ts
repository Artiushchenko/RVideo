import { PrismaService } from '@/prisma.service'
import {
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async createComment(userId: string, dto: CreateCommentDto) {
		const { text, videoId } = dto

		const video = await this.prisma.video.findUnique({
			where: { id: videoId }
		})

		if (!video) {
			throw new NotFoundException('Видео не найдено')
		}

		const comment = await this.prisma.videoComment.create({
			data: {
				text,
				userId,
				videoId
			},
			include: {
				user: true
			}
		})

		return comment
	}

	async updateComment(
		commentId: string,
		userId: string,
		dto: UpdateCommentDto
	) {
		const comment = await this.prisma.videoComment.findUnique({
			where: { id: commentId }
		})

		if (!comment) {
			throw new NotFoundException('Комментарий не найден')
		}

		if (comment.userId !== userId) {
			throw new ForbiddenException(
				'Вы не можете редактировать этот комментарий'
			)
		}

		const updatedComment = await this.prisma.videoComment.update({
			where: { id: commentId },
			data: {
				text: dto.text
			},
			include: {
				user: true
			}
		})

		return updatedComment
	}

	async deleteComment(commentId: string, userId: string) {
		const comment = await this.prisma.videoComment.findUnique({
			where: { id: commentId }
		})

		if (!comment) {
			throw new NotFoundException('Комментарий не найден')
		}

		if (comment.userId !== userId) {
			throw new ForbiddenException('Вы не можете удалить этот комментарий')
		}

		await this.prisma.videoComment.delete({
			where: { id: commentId }
		})

		return { message: 'Комментарий удален' }
	}

	async getCommentsByPublicId(publicId: string) {
		const comments = await this.prisma.videoComment.findMany({
			where: {
				video: {
					publicId
				}
			},
			include: {
				user: {
					include: {
						channel: true
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return comments
	}
}
