import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedFolders = ['avatars', 'banners', 'thumbnails', 'videos']

@Injectable()
export class FolderValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (
			metadata.type === 'query' &&
			value &&
			!allowedFolders.includes(value?.toLowerCase())
		) {
			throw new BadRequestException(`Invalid folder name: ${value}`)
		}

		return value
	}
}
