import cn from 'clsx'
import Link from 'next/link'

import type { IMenuItemProps } from './menu.types'

export function MenuItem({ item, isActive, isShowedSidebar }: IMenuItemProps) {
	return (
		<li>
			<Link
				href={item.link}
				className={'group py-3 flex items-center gap-6'}
				title={item.label}
			>
				<item.icon
					className={cn('min-w-6', {
						'group-hover:text-primary transition group-hover:rotate-6': !isActive,
						'text-red-500': isActive && !isShowedSidebar
					})}
				/>
				<span
					className={cn('border-b', {
						'border-white': isActive,
						'border-transparent': !isActive
					})}
				>
					{item.label}
				</span>
			</Link>

			{item.isBottomBorder && <span className='h-[1px] bg-border my-5 w-full block' />}
		</li>
	)
}
