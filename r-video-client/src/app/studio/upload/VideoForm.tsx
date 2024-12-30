import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { Textarea } from '@/ui/field/Textarea'
import { TagsField } from '@/ui/tags-field/TagsField'
import { UploadField } from '@/ui/upload-field/UploadField'

import { stripHtmlWithBreak } from '@/utils/strip-html'

import { UploadSkeleton } from './UploadSkeleton'
import { VideoFormRightSide } from './VideoFormRightSide'
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

					<VideoFormRightSide watch={watch} />
				</>
			)}
		</div>
	)
}
