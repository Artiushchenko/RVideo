import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

export function generateFilename(fileName: string): string {
	const decodedFileName = Buffer.from(fileName, 'latin1').toString('utf8')
	const fileExtension = path.extname(decodedFileName)

	const ids = uuidv4().split('-')
	const uniqueFileName = ids[0] + ids[1] + fileExtension

	return uniqueFileName
}
