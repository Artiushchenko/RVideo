export interface IResolution {
	name: string
	width: number
	height: number
}

export const RESOLUTIONS: IResolution[] = [
	{ name: '4K', width: 3840, height: 2160 },
	{ name: '2K', width: 2560, height: 1440 },
	{ name: '1080p', width: 1920, height: 1080 },
	{ name: '720p', width: 1280, height: 720 },
	{ name: '480p', width: 854, height: 480 },
	{ name: '360p', width: 640, height: 360 }
]
