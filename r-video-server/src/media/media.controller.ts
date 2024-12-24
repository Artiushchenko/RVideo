import { Auth } from '@/auth/decorators/auth.decorator'
import {
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
	UsePipes
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { IFile } from './media.interface'
import { MediaService } from './media.service'
import { FileValidationPipe } from './pipes/file.validation.pipe'
import { FolderValidationPipe } from './pipes/folder.validation.pipe'

@Controller('upload-file')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FilesInterceptor('file'))
	@UsePipes(new FolderValidationPipe())
	async uploadMediaFile(
		@UploadedFiles(FileValidationPipe) mediaFile: IFile[],
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}

	@Get('status/:fileName')
	@Auth()
	async getProcessingStatus(@Param('fileName') fileName: string) {
		const status = this.mediaService.getProcessingStatus(fileName)
		return { fileName, status }
	}
}
