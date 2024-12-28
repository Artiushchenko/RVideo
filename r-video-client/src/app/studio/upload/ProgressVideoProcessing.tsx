import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/studio/file.service'

interface Props {
	fileName: string
	isReadyToPublish: boolean
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
}

export function ProgressVideoProcessing({
	fileName,
	isReadyToPublish,
	setIsReadyToPublish
}: Props) {
	const [progress, setProgress] = useState(0)

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['processing file', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		select(data) {
			return data.data.status
		},
		refetchInterval: query => {
			const queryProgress = query.state.data?.data

			return queryProgress !== undefined && queryProgress.status < 100 ? 3500 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	useEffect(() => {
		if (!processingData) {
			return
		}

		setProgress(processingData)

		if (processingData === 100) {
			setIsReadyToPublish(true)
			toast.success('File processed successfully')
		}
	}, [isSuccess, setIsReadyToPublish, processingData])

	return (
		progress > 0 && (
			<div
				className='flex items-center justify-center py-0.5 w-full relative rounded-sm overflow-hidden text-sm font-medium mb-6'
				style={{ backgroundColor: 'rgb(196 196 196 / 15%)' }}
			>
				<div
					className='absolute inset-0 h-full bg-gradient-to-r from-gray-500 to-gray-600 animate-pulse transition-all'
					style={{
						width: progress ? `${progress}%` : 0
					}}
				/>
				<span className='relative'>{`${Math.round(progress)}%`}</span>
			</div>
		)
	)
}
