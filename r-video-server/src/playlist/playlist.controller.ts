import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PlaylistService } from './playlist.service'

import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/user/decorators/user.decorator'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { ToggleVideoDto } from './dto/toggle-video.dto'

@Controller('playlists')
export class PlaylistController {
	constructor(private readonly playlistService: PlaylistService) {}

	@Get()
	@Auth()
	getUserPlaylists(@CurrentUser('id') userId: string) {
		return this.playlistService.getUserPlaylists(userId)
	}

	@Get(':playlistId')
	@Auth()
	getPlaylistById(@Param('playlistId') playlistId: string) {
		return this.playlistService.getPlaylistById(playlistId)
	}

	@Post(':playlistId/toggle-video')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	@Auth()
	toggleVideoInPlaylist(
		@Param('playlistId') playlistId: string,
		@Body() toggleVideoDto: ToggleVideoDto,
		@CurrentUser('id') userId: string
	) {
		const { videoId } = toggleVideoDto
		return this.playlistService.toggleVideoInPlaylist(
			playlistId,
			videoId,
			userId
		)
	}

	@Auth()
	@Post()
	@UsePipes(new ValidationPipe({ whitelist: true }))
	createPlaylist(
		@Body() createPlaylistDto: CreatePlaylistDto,
		@CurrentUser('id') userId: string
	) {
		return this.playlistService.createPlaylist(userId, createPlaylistDto)
	}
}
