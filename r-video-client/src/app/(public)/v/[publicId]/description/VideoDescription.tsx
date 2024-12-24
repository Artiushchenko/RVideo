'use client'

import parse from 'html-react-parser'
import { useState } from 'react'

import { processHtmlContent } from '@/utils/process-html-content'

import styles from './VideoDescription.module.scss'

export function VideoDescription({ description }: { description: string }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)

	return (
		<div className='relative mb-6 bg-gray-800 px-3 py-1.5 rounded-lg'>
			<article className={styles.article}>
				{parse(isExpanded ? description : initialContent)}
			</article>

			{isShouldShowToggle && (
				<button
					onClick={() => setIsExpanded(prev => !prev)}
					className='text-gray-400 uppercase transition-colors hover:text-gray-200 mt-2'
				>
					{isExpanded ? 'Hide' : 'Show more'}
				</button>
			)}
		</div>
	)
}
