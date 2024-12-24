'use client'

import cn from 'clsx'
import { type ChangeEvent, useState } from 'react'

import { COLORS } from '@/constants/colors.constant'

import { getTime } from '@/utils/video-player'

interface Props {
	currentTime: number
	duration: number
	progress: number
	onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, progress, duration, onSeek }: Props) {
	const [isDragging, setIsDragging] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)

		onSeek(value)
	}

	return (
		<div
			className='relative w-full flex items-center rounded-lg'
			style={{
				backgroundColor: 'rgb(196 196 196 / 60%)'
			}}
		>
			<div
				className='absolute top-0 left-0 h-1.5 rounded-lg'
				style={{
					width: `${progress}%`,
					backgroundColor: COLORS.primary,
					transition: 'width 0.2s ease'
				}}
			/>

			<div
				className={cn(
					'absolute -top-9 left-0 text-base text-white transition-opacity duration-700 px-1 py-1 bg-black rounded-lg',
					isDragging ? 'opacity-100' : 'opacity-0'
				)}
				style={{
					left: `calc(${progress}% - 20px)`
				}}
			>
				{getTime(currentTime)}
			</div>

			<input
				type='range'
				min={0}
				max={duration}
				value={currentTime}
				onChange={handleChange}
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={() => setIsDragging(false)}
				className='w-full h-1.5 opacity-0 appearance-none pointer-events-auto cursor-pointer'
			/>
		</div>
	)
}
