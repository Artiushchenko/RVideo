import * as React from 'react'

export default function VerificationEmail({ url }: { url: string }) {
	return (
		<div>
			<h1>Welcome!</h1>

			<p>There is very little left, you need to confirm your e-mail. mail.</p>

			<a href={url}>Confirm E-mail</a>

			<p>or copy the link and paste it into your browser</p>

			<a
				href={url}
				target="_blank"
				style={{
					color: '#A981DC'
				}}
			>
				{url}
			</a>
		</div>
	)
}
