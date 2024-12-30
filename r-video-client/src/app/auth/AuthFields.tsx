import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/ui/field/Field'

import type { IAuthForm } from '@/types/auth-form.types'

interface Props {
	form: UseFormReturn<IAuthForm>
}

export function AuthFields({ form }: Props) {
	const {
		register,
		formState: { errors }
	} = form

	return (
		<>
			<Field
				label='E-mail'
				type='email'
				registration={register('email', { required: 'E-mail is required' })}
				error={errors.email?.message}
				placeholder='Enter e-mail'
			/>

			<Field
				label='Password'
				type='password'
				registration={register('password', { required: 'Password is required' })}
				error={errors.password?.message}
				placeholder='Enter password'
			/>
		</>
	)
}
