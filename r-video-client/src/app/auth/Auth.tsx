'use client'

import dynamic from 'next/dynamic'
import { forwardRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Logo } from '@/components/layout/sidebar/header/Logo'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'

import { AuthFields } from './AuthFields'
import { SwitchAuth } from './SwitchAuth'
import { useAuthForm } from './useAuthForm'
import type { IAuthForm } from '@/types/auth-form.types'

const DynamicRecaptcha = dynamic(() => import('./Recaptcha').then(mod => mod.Recaptcha))

const ForwardedRefRecaptcha = forwardRef<ReCAPTCHA>((props, ref) => (
	<DynamicRecaptcha
		{...props}
		forwardedRef={ref}
	/>
))

ForwardedRefRecaptcha.displayName = 'ForwardedRefRecaptcha'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)
	const form = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset
	} = form
	const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset)

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='w-1/5 p-layout border-border border rounded'>
				<div className='text-center mb-1'>
					<Logo />
				</div>

				<SwitchAuth
					isLogin={isLogin}
					setIsLogin={setIsLogin}
				/>

				<form onSubmit={handleSubmit(onSubmit)}>
					{isLoading ? (
						<SkeletonLoader count={3} />
					) : (
						<>
							<AuthFields form={form} />

							{!isLogin && (
								<Field
									label='Confirm password'
									type='password'
									registration={register('confirmPassword', {
										required: 'Password confirmation is required',
										validate: value => value === watch('password') || 'Passwords don`t match'
									})}
									error={errors.confirmPassword?.message}
									placeholder='Enter password again'
								/>
							)}

							<ForwardedRefRecaptcha ref={recaptchaRef} />
						</>
					)}

					<div className='text-center mt-4'>
						<Button
							type='submit'
							isLoading={isLoading}
						>
							{isLogin ? 'Log in' : 'Register'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
