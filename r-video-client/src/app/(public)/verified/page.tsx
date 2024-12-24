import { Check } from 'lucide-react'

export default function VerifiedPage() {
	return (
		<div className='mx-auto w-1/2 mt-24 text-center'>
			<h1 className='font-semibold uppercase text-2xl inline-flex gap-2 items-center'>
				<Check
					size={25}
					className='text-green-500'
				/>
				<span>E-mail successfully verified!</span>
			</h1>
		</div>
	)
}
