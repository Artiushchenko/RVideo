import { type ISitemapField, getServerSideSitemap } from 'next-sitemap'

import { PAGE } from '@/config/public-page.config'

import { videoService } from '@/services/video.service'

const URL = 'https://r-video.com'

export async function GET() {
	const { data } = await videoService.getAll()

	const fields: ISitemapField[] = [
		{
			loc: URL,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 0.9
		}
	]

	if (data.videos.length) {
		data.videos.forEach(video => {
			fields.push({
				loc: `${URL}${PAGE.VIDEO(video.publicId)}`,
				lastmod: new Date(video.updatedAt).toISOString(),
				changefreq: 'daily',
				priority: 0.9
			})
		})
	}

	return getServerSideSitemap(fields)
}
