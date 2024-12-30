import Image from 'next/image'
import type { UseFormWatch } from 'react-hook-form'

import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	watch: UseFormWatch<IVideoFormData>
}

export function VideoFormRightSide({ watch }: Props) {
	return (
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
	)
}
