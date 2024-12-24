import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { MediaController } from './media.controller'
import { MediaService } from './media.service'
import { UploadsController } from './uploads.controller'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		})
	],
	controllers: [MediaController, UploadsController],
	providers: [MediaService]
})
export class MediaModule {}
