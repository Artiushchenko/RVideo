import { EmailService } from '@/email/email.service'
import { PrismaService } from '@/prisma.service'
import { UserModule } from '@/user/user.module'
import { UserService } from '@/user/user.service'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from 'src/config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenService } from './refresh-token.service'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	controllers: [AuthController],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		UserModule
	],
	providers: [
		AuthService,
		JwtStrategy,
		EmailService,
		PrismaService,
		UserService,
		RefreshTokenService
	]
})
export class AuthModule {}
