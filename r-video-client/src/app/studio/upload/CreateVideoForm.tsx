import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { SubmitHandler } from 'react-hook-form'
import { type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/ui/button/Button'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { VideoForm } from './VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	form: UseFormReturn<IVideoFormData, object, undefined>
	isReadyToPublish: boolean
}

export function CreateVideoForm({ form, isReadyToPublish }: Props) {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess() {
			form.reset()
			toast.success('Video successfully published')
			router.push(STUDIO_PAGE.HOME)
		},
		onError() {
			toast.error('Error publishing video')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<VideoForm form={form} />

			<div className='text-right mt-4'>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing...'}
				</Button>
			</div>
		</form>
	)
}
