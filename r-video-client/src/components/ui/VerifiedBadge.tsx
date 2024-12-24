import { BadgeCheck } from 'lucide-react'

export function VerifiedBadge({ size = 15 }: { size?: number }) {
	return (
		<span>
			<BadgeCheck
				className='text-green-500'
				size={size}
			/>
		</span>
	)
}
