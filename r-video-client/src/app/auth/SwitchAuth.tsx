import type { Dispatch, SetStateAction } from 'react'

interface Props {
	isLogin: boolean
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

export function SwitchAuth({ isLogin, setIsLogin }: Props) {
	return (
		<div className='flex justify-center mb-6'>
			<button
				type='button'
				className={`px-4 py-2 font-semibold ${
					isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
				}`}
				onClick={() => setIsLogin(true)}
			>
				Log in
			</button>

			<button
				type='button'
				className={`px-4 py-2 font-semibold ${
					!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
				}`}
				onClick={() => setIsLogin(false)}
			>
				Register
			</button>
		</div>
	)
}
