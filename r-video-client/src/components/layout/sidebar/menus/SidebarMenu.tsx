'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { PAGE } from '@/config/public-page.config'

import { useAuth } from '@/hooks/useAuth'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'
import { MyChannelMenuItem } from './MyChannelMenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
	isShowedSidebar: boolean
}

export function SidebarMenu({ menu, title, isShowedSidebar }: Props) {
	const pathname = usePathname()
	const { isLoggedIn } = useAuth()

	return (
		<nav>
			{title && <div className='opacity-70 uppercase font-medium text-xs mb-3'>{title}</div>}
			<ul>
				{menu.map(menuItem => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar
					}

					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
					const isMyChannelItem = isMyChannel && isLoggedIn

					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={menuItem.label}
							{...props}
						/>
					) : isMyChannel ? null : (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
