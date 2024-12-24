import { Dot, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ISidebarSubItem } from '../../sidebar.types'

interface Props {
	item: ISidebarSubItem
}

export function SubItem({ item }: Props) {
	return (
		<li>
			<Link href={item.link}>
				{item.avatar && (
					<Image
						src={item.avatar}
						alt={item.label}
						width={30}
						height={30}
					/>
				)}

				<span>
					<span>{item.label}</span>
					{item.isLiveNow && <Radio />}
					{item.isRecentUpload && <Dot />}
				</span>
			</Link>
		</li>
	)
}
