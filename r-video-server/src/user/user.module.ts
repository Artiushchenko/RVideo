import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [ConfigModule],
	providers: [UserService, PrismaService],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule {}
