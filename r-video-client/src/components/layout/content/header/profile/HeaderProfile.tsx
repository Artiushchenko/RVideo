import { LogIn } from 'lucide-react'

import { LinkButton } from '@/ui/button/LinkButton'

import { PAGE } from '@/config/public-page.config'

import { useAuth } from '@/hooks/useAuth'

import { HeaderAvatar } from './HeaderAvatar'

export function HeaderProfile() {
	const { isLoggedIn } = useAuth()

	return isLoggedIn ? (
		<HeaderAvatar />
	) : (
		<LinkButton href={PAGE.AUTH}>
			<LogIn size={20} /> Auth
		</LinkButton>
	)
}
