import Image from 'next/image'

import { SkeletonLoader } from '../SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string
	aspectRation?: '16:9' | '1:1'
}

export function ImagePreview({ isLoading, value, overlay, aspectRation }: Props) {
	const isWideScreenRation = aspectRation === '16:9'
	const width = isWideScreenRation ? 446 : 100
	const height = isWideScreenRation ? 250 : 100

	return (
		<div className='mt-3'>
			{isLoading ? (
				<SkeletonLoader
					style={{
						width,
						height
					}}
				/>
			) : (
				!!value && (
					<div className='relative'>
						{!!overlay && (
							<Image
								alt='Overlay'
								className='rounded-md absolute top-0 left-0 w-full h-full'
								src={overlay}
								width={width}
								height={height}
								priority
							/>
						)}
						<Image
							alt='Uploaded file'
							className='rounded-md'
							src={value}
							width={width}
							height={height}
							priority
						/>
					</div>
				)
			)}
		</div>
	)
}
