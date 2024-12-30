import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, useCallback } from 'react'

import { validateFileSize } from './validate-file-size'
import { fileService } from '@/services/studio/file.service'
import type { IFileResponse } from '@/types/file.types'

interface Props {
	folder?: string
	onChange?: (url: string) => void
	onSuccess?: (data: IFileResponse[]) => void
	onError?: () => void
	maxFileSize?: number
}

type TUseUpload = (props: Props) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
}

export const useUpload: TUseUpload = ({ folder, onChange, onSuccess, onError, maxFileSize }) => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),

		onSuccess: ({ data }) => {
			if (onChange) {
				onChange(data[0].url)
			}

			if (onSuccess) {
				onSuccess(data)
			}
		},

		onError: async error => {
			const { toast } = await import('react-hot-toast')
			toast.error(error.message)

			if (onError) {
				onError()
			}
		}
	})

	const uploadFile = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files

			if (!files?.length) {
				return
			}

			const file = files[0]

			if (!validateFileSize(file, maxFileSize)) {
				return
			}

			const formData = new FormData()

			formData.append('file', file)

			mutate(formData)
		},
		[mutate, maxFileSize]
	)

	return {
		uploadFile,
		isLoading: isPending
	}
}
