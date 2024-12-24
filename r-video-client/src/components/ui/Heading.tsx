import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isH1?: boolean
	isPageHeading?: boolean
	className?: string
	classNameHeading?: string
}

export function Heading({
	children,
	Icon,
	isH1 = false,
	isPageHeading = false,
	className,
	classNameHeading
}: Props) {
	return (
		<div
			className={twMerge(
				'flex items-center opacity-90',
				isPageHeading ? 'gap-2.5 mb-5' : 'gap-1.5 mb-3',
				className
			)}
		>
			{Icon && <Icon className='text-primary' />}
			{isH1 || isPageHeading ? (
				<h1
					className={twMerge(
						'font-semibold',
						isPageHeading ? 'text-2xl' : 'text-lg',
						classNameHeading
					)}
				>
					{children}
				</h1>
			) : (
				<h2 className={twMerge('font-semibold text-lg', classNameHeading)}>{children}</h2>
			)}
		</div>
	)
}
