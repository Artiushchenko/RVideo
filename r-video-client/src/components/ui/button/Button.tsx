import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: ReactNode
	variant?: 'primary' | 'secondary'
}

export function Button({ isLoading, children, variant = 'primary', ...props }: Props) {
	return (
		<button
			className={cn('py-2 px-10 font-semibold rounded transition-colors disabled:bg-gray-400', {
				'bg-primary text-white hover:bg-red-400': variant === 'primary',
				'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary'
			})}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
