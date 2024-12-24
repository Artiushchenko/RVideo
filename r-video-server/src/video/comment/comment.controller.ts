import { Auth } from '@/auth/decorators/auth.decorator'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Request
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'

@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Auth()
	@Post()
	async createComment(@Body() dto: CreateCommentDto, @Request() req) {
		const userId = req.user.id
		return await this.commentService.createComment(userId, dto)
	}

	@Auth()
	@Put(':id')
	async updateComment(
		@Param('id') commentId: string,
		@Body() dto: UpdateCommentDto,
		@Request() req
	) {
		const userId = req.user.id
		return await this.commentService.updateComment(commentId, userId, dto)
	}

	@Auth()
	@Delete(':id')
	async deleteComment(@Param('id') commentId: string, @Request() req) {
		const userId = req.user.id
		return await this.commentService.deleteComment(commentId, userId)
	}

	@Get('by-video/:publicId')
	async getCommentsByPublicId(@Param('publicId') publicId: string) {
		return await this.commentService.getCommentsByPublicId(publicId)
	}
}
