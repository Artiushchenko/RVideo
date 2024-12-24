import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { CommentController } from './comment/comment.controller'
import { CommentService } from './comment/comment.service'
import { StudioVideoController } from './studio/studio-video.controller'
import { StudioVideoService } from './studio/studio-video.service'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'

@Module({
	controllers: [VideoController, StudioVideoController, CommentController],
	providers: [VideoService, StudioVideoService, CommentService, PrismaService],
	exports: [VideoService]
})
export class VideoModule {}
