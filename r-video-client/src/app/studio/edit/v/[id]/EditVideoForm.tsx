'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { VideoForm } from '@/app/studio/upload/VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

export function EditVideoForm() {
	const { id } = useParams()
	const router = useRouter()

	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get studio video', id],
		queryFn: () => studioVideoService.byId(id as string)
	})

	useEffect(() => {
		if (!isSuccess) {
			return
		}

		const initialVideo = data.data

		form.reset({
			description: initialVideo.description,
			maxResolution: initialVideo.maxResolution,
			thumbnailUrl: initialVideo.thumbnailUrl,
			tags: initialVideo.tags.map(tag => tag.name),
			title: initialVideo.title,
			videoFileName: initialVideo.videoFileName
		})
	}, [form, isSuccess, data])

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})

			toast.success('Video successfully updated')
			router.push(STUDIO_PAGE.HOME)
		},
		onError() {
			toast.error('Error updating video')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<div className='max-w-5xl mx-auto'>
			<Heading
				Icon={Edit}
				isPageHeading
			>
				Edit video
			</Heading>

			<form onSubmit={form.handleSubmit(onSubmit)}>
				<VideoForm
					form={form}
					isPending={isLoading || isPending}
				/>

				<div className='text-right mt-4'>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}
