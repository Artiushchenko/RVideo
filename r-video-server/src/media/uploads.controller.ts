import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('uploads')
export class UploadsController {
	@Get()
	getAll(@Res() res: Response) {
		res
			.status(HttpStatus.FORBIDDEN)
			.send('Access to this directory is forbidden')
	}

	@Get('index.html')
	getAllByIndexHtml(@Res() res: Response) {
		res
			.status(HttpStatus.FORBIDDEN)
			.send('Access to this directory is forbidden')
	}
}
