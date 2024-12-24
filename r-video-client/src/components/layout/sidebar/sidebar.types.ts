import type { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
	icon: LucideIcon
	label: string
	link: string
	isBottomBorder?: boolean
}

export interface ISidebarSubItem {
	avatar: string
	label: string
	link: string
	isLiveNow?: boolean
	isRecentUpload?: boolean
}
