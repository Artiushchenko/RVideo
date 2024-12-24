import { axiosClassic, instance } from '@/api/axios'

import type { IComment, ICommentData } from '@/types/comment.types'

class CommentService {
	private _COMMENTS = '/comments'

	async byVideoPublicId(publicId?: string | null) {
		const { data } = await axiosClassic.get<IComment[]>(`${this._COMMENTS}/by-video/${publicId}`)

		return data
	}

	create(data: ICommentData) {
		return instance.post<IComment>(this._COMMENTS, data)
	}

	update(id: string, data: ICommentData) {
		return instance.put<IComment>(`${this._COMMENTS}/${id}`, data)
	}

	delete(id: string) {
		return instance.delete<IComment>(`${this._COMMENTS}/${id}`)
	}
}

export const commentService = new CommentService()
