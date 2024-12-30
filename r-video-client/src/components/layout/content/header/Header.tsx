'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { HeaderLinks } from './HeaderLinks'
import { SearchField } from './SearchField'

const DynamicHeaderProfile = dynamic(
	() => import('./profile/HeaderProfile').then(mod => mod.HeaderProfile),
	{ ssr: false, loading: () => <SkeletonLoader className='w-10 mb-0 rounded-lg' /> }
)

export function Header() {
	return (
		<header className='p-layout border-b border-border flex items-center justify-between'>
			<SearchField />

			<div className='flex items-center gap-7'>
				<HeaderLinks />
				<DynamicHeaderProfile />
			</div>
		</header>
	)
}
