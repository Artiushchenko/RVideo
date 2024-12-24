import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/svg+xml',
	'video/mp4',
	'video/quicktime'
]

const MAX_FILE_SIZE = 300 * 1024 * 1024 // 300 МБ

@Injectable()
export class FileValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const files = Array.isArray(value) ? value : [value]

		for (const file of files) {
			if (!file || !file.mimetype) {
				throw new BadRequestException('No file provided')
			}

			if (!allowedMimeTypes.includes(file.mimetype)) {
				throw new BadRequestException(`Unsupported file type`)
			}

			if (file.size > MAX_FILE_SIZE) {
				throw new BadRequestException(`File size is too big`)
			}
		}

		return value
	}
}
