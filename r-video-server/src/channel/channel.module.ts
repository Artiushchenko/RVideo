import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChannelController } from './channel.controller'
import { ChannelService } from './channel.service'

@Module({
	imports: [ConfigModule],
	providers: [ChannelService, PrismaService],
	controllers: [ChannelController],
	exports: [ChannelService]
})
export class ChannelModule {}
