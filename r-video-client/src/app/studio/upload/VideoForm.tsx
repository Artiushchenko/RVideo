import Image from 'next/image'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tags-field/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { stripHtmlWithBreak } from '@/utils/strip-html'

import { UploadSkeleton } from './UploadSkeleton'
import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	isPending?: boolean
	form: UseFormReturn<IVideoFormData, object, undefined>
}

export function VideoForm({
	isPending,
	form: {
		register,
		control,
		formState: { errors },
		watch
	}
}: Props) {
	return (
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

						<Controller
							control={control}
							name='description'
							render={({ field: { onChange, value }, fieldState: { error } }) => (
								<Textarea
									label='Description'
									value={stripHtmlWithBreak(value || '')}
									onChange={e => onChange(e.target.value)}
									error={error?.message}
									placeholder='Enter description'
									rows={7}
								/>
							)}
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
									className='w-full'
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
	)
}
