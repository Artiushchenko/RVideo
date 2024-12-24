import { Controller, Get, Param, Patch } from '@nestjs/common'

import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/user/decorators/user.decorator'
import { ChannelService } from './channel.service'

@Controller('channels')
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Get()
	async getAll() {
		return this.channelService.getAll()
	}

	@Get('by-slug/:slug')
	async getProfile(@Param('slug') slug: string) {
		return this.channelService.bySlug(slug)
	}

	@Patch('toggle-subscribe/:slug')
	@Auth()
	async toggleSubscribe(
		@Param('slug') slug: string,
		@CurrentUser('id') userId: string
	) {
		return this.channelService.toggleSubscribe(slug, userId)
	}
}
