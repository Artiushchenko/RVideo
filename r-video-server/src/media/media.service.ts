import { Injectable } from '@nestjs/common'

import { EnumVideoPlayerQuality } from '@/video/dto/video.types'
import { path as appRootPath } from 'app-root-path'
import * as ffmpeg from 'fluent-ffmpeg'
import { ensureDir, writeFile } from 'fs-extra'
import * as path from 'path'
import { generateFilename } from './generate-filename'
import { IFile, IMediaResponse } from './media.interface'
import { IResolution, RESOLUTIONS } from './resolution.data'

@Injectable()
export class MediaService {
	private readonly _outputDir = path.join(appRootPath, 'uploads')

	private processingStatus: Map<string, number> = new Map()

	async saveMedia(
		files: IFile[],
		folder = 'default'
	): Promise<IMediaResponse[]> {
		const folderLowerCase = folder.toLowerCase()
		const uploadFolder = path.join(this._outputDir, folderLowerCase)
		await ensureDir(uploadFolder)

		const file = files[0]

		const uniqueFileName = generateFilename(file?.originalname || file?.name)
		const filePath = path.join(uploadFolder, uniqueFileName)

		if (this.isVideo(file)) {
			await writeFile(filePath, file.buffer)

			const { width: inputWidth, height: inputHeight } =
				await this.getVideoResolution(filePath)

			const maxResolution = this.mapResolution(inputWidth, inputHeight)

			this.processingStatus.set(uniqueFileName, 0)

			this.processVideo(filePath, uniqueFileName, folderLowerCase)
				.then(() => {
					this.processingStatus.set(uniqueFileName, 100)
				})
				.catch(err => {
					this.processingStatus.set(uniqueFileName, -1)
					console.error('Ошибка при обработке видео:', err)
				})

			return [
				{
					url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
					name: uniqueFileName,
					maxResolution
				}
			]
		} else {
			await writeFile(filePath, file.buffer)

			return [
				{
					url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
					name: uniqueFileName
				}
			]
		}
	}

	private isVideo(file: IFile): boolean {
		return file.mimetype.startsWith('video/')
	}

	private async processVideo(
		inputPath: string,
		fileName: string,
		folder: string
	): Promise<void> {
		try {
			const { width: inputWidth, height: inputHeight } =
				await this.getVideoResolution(inputPath)

			const availableResolutions = RESOLUTIONS.filter(
				resolution =>
					resolution.width <= inputWidth && resolution.height <= inputHeight
			)

			const totalResolutions = availableResolutions.length

			for (let i = 0; i < totalResolutions; i++) {
				const resolution = availableResolutions[i]

				await this.convertVideo(
					inputPath,
					resolution,
					fileName,
					folder,
					totalResolutions,
					i
				)
			}

			this.processingStatus.set(fileName, 100)
		} catch (err) {
			this.processingStatus.set(fileName, -1)
			console.error('Ошибка при обработке видео:', err)
		}
	}

	private getVideoResolution(
		filePath: string
	): Promise<{ width: number; height: number }> {
		return new Promise((resolve, reject) => {
			ffmpeg.ffprobe(filePath, (err, metadata) => {
				if (err) {
					reject(err)
				} else {
					const videoStream = metadata.streams.find(
						stream => stream.codec_type === 'video'
					)
					if (videoStream) {
						resolve({
							width: videoStream.width,
							height: videoStream.height
						})
					} else {
						reject(new Error('Видео поток не найден'))
					}
				}
			})
		})
	}

	private async convertVideo(
		inputPath: string,
		resolution: IResolution,
		fileName: string,
		folder: string,
		totalResolutions: number,
		currentResolutionIndex: number
	): Promise<void> {
		const outputDir = path.join(this._outputDir, folder, resolution.name)
		await ensureDir(outputDir)

		const outputPath = path.join(outputDir, fileName)

		return new Promise<void>((resolve, reject) => {
			ffmpeg(inputPath)
				.size(`${resolution.width}x${resolution.height}`)
				.output(outputPath)
				.on('progress', progress => {
					const percent = progress.percent || 0

					const perResolutionProgress = 1 / totalResolutions
					const overallProgress =
						((currentResolutionIndex + percent / 100) / totalResolutions) * 100

					this.processingStatus.set(fileName, overallProgress)
				})
				.on('end', () => {
					resolve()
				})
				.on('error', err => {
					reject(err)
				})
				.run()
		})
	}

	getProcessingStatus(fileName: string): number {
		return this.processingStatus.get(fileName) || 0
	}

	private mapResolution(width: number, height: number): EnumVideoPlayerQuality {
		const resolutions = [
			{ width: 3840, height: 2160, name: EnumVideoPlayerQuality['4K'] },
			{ width: 2560, height: 1440, name: EnumVideoPlayerQuality['2K'] },
			{ width: 1920, height: 1080, name: EnumVideoPlayerQuality['1080p'] },
			{ width: 1280, height: 720, name: EnumVideoPlayerQuality['720p'] },
			{ width: 854, height: 480, name: EnumVideoPlayerQuality['480p'] },
			{ width: 640, height: 360, name: EnumVideoPlayerQuality['360p'] }
		]

		for (const res of resolutions) {
			if (width >= res.width && height >= res.height) {
				return res.name
			}
		}

		return EnumVideoPlayerQuality['720p']
	}
}
