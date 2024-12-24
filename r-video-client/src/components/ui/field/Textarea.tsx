import { type TextareaHTMLAttributes, useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	registration: UseFormRegisterReturn
	wrapperClassName?: string
}

export function Textarea({
	label,
	error,
	registration,
	wrapperClassName,
	className,
	...props
}: Props) {
	const id = useId()

	return (
		<div className={twMerge('mb-4', wrapperClassName)}>
			{label && (
				<label htmlFor={id}>
					<span className='block text-gray-400 font-semibold mb-2'>{label}</span>
				</label>
			)}

			<textarea
				id={id}
				className={twMerge(
					'w-full px-3 py-2 border rounded shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-gray-500 bg-transparent resize-none',
					error ? 'border-red-500' : 'border-border',
					className
				)}
				{...registration}
				{...props}
			/>
			{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
		</div>
	)
}
