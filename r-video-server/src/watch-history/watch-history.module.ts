import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { WatchHistoryController } from './watch-history.controller'
import { WatchHistoryService } from './watch-history.service'

@Module({
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService, PrismaService],
})
export class WatchHistoryModule {}
