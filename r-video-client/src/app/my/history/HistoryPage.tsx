'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem'

import { watchHistoryService } from '@/services/watch-history.service'

export function HistoryPage() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['watchHistory'],
		queryFn: () => watchHistoryService.getUserHistory()
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['clear history'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess() {
			refetch()
		}
	})

	return (
		<section className='w-1/2'>
			<div className='flex justify-between items-center mb-6'>
				<Heading
					isPageHeading
					Icon={History}
					className='mb-0'
				>
					History
				</Heading>

				<Button
					variant='simple'
					isLoading={isPending}
					onClick={() => mutate()}
				>
					Clear history
				</Button>
			</div>

			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-28 rounded-md mb-6'
					/>
				) : data?.data?.length ? (
					data?.data?.map(history => (
						<HorizontalVideoItem
							key={history.video.id}
							video={history.video}
						/>
					))
				) : (
					<p>Watch history not found</p>
				)}
			</div>
		</section>
	)
}
