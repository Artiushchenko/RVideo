import type { IChannel } from './channel.types'
import type { IUser } from './user.types'

export interface IComment {
	id: string
	text: string
	createdAt: string
	user: IUser & {
		channel?: IChannel
	}
	videoId: string
}

export interface ICommentData {
	text: string
	videoId: string
}
