'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { STUDIO_PAGE } from '@/config/studio-page.config'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscriptions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./Logout').then(mod => mod.Logout), { ssr: false })

export function Sidebar({
	toggleSidebar,
	isShowedSidebar
}: {
	toggleSidebar: () => void
	isShowedSidebar: boolean
}) {
	const pathname = usePathname()

	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />

			<SidebarMenu
				menu={SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>

			<SidebarSubscriptions />

			{!!pathname.includes(STUDIO_PAGE.HOME) && (
				<>
					<SidebarMenu
						title='Studio'
						menu={STUDIO_SIDEBAR_DATA}
						isShowedSidebar={isShowedSidebar}
					/>

					<span className='h-[1px] bg-border my-5 w-full block' />
				</>
			)}

			<SidebarMenu
				title='More from youtube'
				menu={MORE_SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>

			<DynamicLogout />
		</aside>
	)
}
