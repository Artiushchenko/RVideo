import { SkeletonLoader } from '@/ui/SkeletonLoader'

export function UploadSkeleton() {
	return (
		<>
			<div>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[74]'
				/>

				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[224]'
				/>

				<SkeletonLoader
					count={1}
					className='bg-gray-700'
				/>

				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[82]'
				/>

				<SkeletonLoader
					count={1}
					className='bg-gray-700 h-[114]'
				/>
			</div>

			<div>
				<SkeletonLoader
					count={1}
					className='bg-gray-700 w-[253] h-[130]'
				/>

				<SkeletonLoader
					count={2}
					className='bg-gray-700'
				/>
			</div>
		</>
	)
}
