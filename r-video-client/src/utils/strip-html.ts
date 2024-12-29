export function stripHtml(html: string) {
	return html.replace(/<\/?[^>]+(>|$)/g, '')
}

export function stripHtmlWithBreak(html: string) {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<\/div>/gi, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.trim()
}
