import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Channel } from '@prisma/client'

type TypeData = keyof IRequestUser

interface IRequestUser {
	id: string
	name: string
	email: string
	password: string
	verificationToken: string | null
	createdAt: Date
	updatedAt: Date
	channel: Channel
}

export const CurrentUser = createParamDecorator(
	(data: TypeData, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request?.user as IRequestUser

		return data ? user?.[data] : user
	}
)
