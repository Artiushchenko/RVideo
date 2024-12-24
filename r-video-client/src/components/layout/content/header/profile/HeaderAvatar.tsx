import Image from 'next/image'
import Link from 'next/link'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { useProfile } from '@/hooks/useProfile'

export function HeaderAvatar() {
	const { profile, isLoading } = useProfile()

	if (isLoading) {
		return <SkeletonLoader className='w-10 mb-0 rounded-lg' />
	}

	return (
		<div className='relative'>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='shrink-0'
			>
				<Image
					src={profile?.channel?.avatarUrl || '/avatar.png'}
					alt=''
					height={40}
					width={40}
					className='rounded-lg'
				/>
			</Link>

			{profile?.verificationToken && (
				<div className='absolute -left-4 -bottom-3.5 bg-primary p-0.5 rounded text-xs w-max'>
					Not verified
				</div>
			)}
		</div>
	)
}
