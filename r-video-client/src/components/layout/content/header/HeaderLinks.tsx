import { Bell, LayoutGrid, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from '@/config/studio-page.config'

export function HeaderLinks() {
	return (
		<div className='flex items-center gap-1'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Upload video'
			>
				<PlusSquare size={20} />
			</Link>

			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Studio'
			>
				<LayoutGrid size={20} />
			</Link>

			<Link
				href={STUDIO_PAGE.HOME}
				className='transition-opacity hover:opacity-100 opacity-50 p-2'
				aria-label='Notifications'
			>
				<Bell size={20} />
			</Link>
		</div>
	)
}
