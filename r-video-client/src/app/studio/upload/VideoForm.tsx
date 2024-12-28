import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tags-field/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { UploadSkeleton } from './UploadSkeleton'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	form: UseFormReturn<IVideoFormData, object, undefined>
	isReadyToPublish: boolean
}

export function VideoForm({
	form: {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		watch
	},
	isReadyToPublish
}: Props) {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess() {
			reset()
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-[2.5fr_1fr] gap-6'>
				{isPending ? (
					<UploadSkeleton />
				) : (
					<>
						<div>
							<Field
								label='Title'
								type='text'
								registration={register('title', {
									required: 'Title is required!'
								})}
								error={errors.title?.message}
								placeholder='Enter title'
							/>

							<Textarea
								label='Description'
								registration={register('description', {
									required: 'Description is required!'
								})}
								error={errors.description?.message}
								placeholder='Enter description'
								rows={7}
							/>

							<Controller
								control={control}
								name='thumbnailUrl'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<UploadField
										label='Thumbnail'
										onChange={onChange}
										value={value}
										error={error}
										folder='thumbnails'
										className='mb-5'
										sizePreview={[150, 85]}
									/>
								)}
							/>

							<Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										label='Tags'
										onTagsChange={onChange}
										tags={value}
										error={error?.message}
									/>
								)}
							/>
						</div>

						<div>
							<div className='bg-gray-700 rounded-md overflow-hidden'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={watch('thumbnailUrl')}
										width={300}
										height={170}
									/>
								) : (
									<div className='flex items-center justify-center font-medium text-sm uppercase w-[300] h-[170] bg-gray-900'>
										No thumbnail yet
									</div>
								)}

								<div className='text-sm p-2'>
									<span className='block text-gray-400 text-[0.9rem] mb-0.5'>File name:</span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>

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
