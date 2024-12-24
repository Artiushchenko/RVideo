import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { nanoid } from 'nanoid'
import { CHANNELS } from './channels.data'
import { VIDEOS } from './videos/videos.data'

const prisma = new PrismaClient()

async function main() {
	console.log('Начало заполнения базы данных...')

	// Массивы для хранения созданных пользователей и каналов
	const users = []
	const channelSlugToId: { [key: string]: string } = {}

	// Создаём каналы и пользователей
	console.log('Создание каналов и пользователей...')
	for (const channel of CHANNELS) {
		const password = '123456'
		const hashedPassword = await hash(password)

		const email = `${channel.slug}@test.com`

		const user = await prisma.user.create({
			data: {
				name: channel.name,
				email: email,
				password: hashedPassword
			}
		})

		const createdChannel = await prisma.channel.create({
			data: {
				slug: channel.slug,
				description: channel.description || '',
				avatarUrl: channel.avatarUrl || '',
				bannerUrl: channel.bannerUrl || '',
				isVerified: channel.isVerified || false,
				user: {
					connect: { id: user.id }
				}
			}
		})

		users.push(user)
		channelSlugToId[channel.slug] = createdChannel.id
	}
	console.log('Каналы и пользователи созданы.')

	// Создаём видео
	console.log('Создание видео, комментариев, лайков и тегов...')
	for (const videoData of VIDEOS) {
		// Получаем channelId из channelSlug
		const channelId = channelSlugToId[videoData.channelSlug]

		if (!channelId) {
			console.warn(
				`Канал с slug '${videoData.channelSlug}' не найден. Видео '${videoData.title}' пропущено.`
			)
			continue
		}

		// Генерируем случайную дату создания (от 0 до 365 дней назад)
		const createdAt = faker.date.between({
			from: faker.date.recent({
				days: 365
			}),
			to: new Date()
		})

		// Создаём видео
		const video = await prisma.video.create({
			data: {
				publicId: nanoid(10),
				title: videoData.title,
				description: videoData.description || '',
				thumbnailUrl: videoData.thumbnailUrl || '',
				videoFileName: videoData.videoFileName || '',
				maxResolution: videoData.maxResolution,
				viewsCount: videoData.viewsCount || 0,
				isPublic: videoData.isPublic || false,
				channelId: channelId,
				createdAt: createdAt,
				tags: {
					connectOrCreate: videoData.tags?.map(tagName => ({
						where: { name: tagName },
						create: { name: tagName }
					}))
				}
			}
		})

		console.log(`Видео '${video.title}' создано.`)

		// Генерируем случайное количество комментариев (от 1 до 10)
		const numComments = faker.number.int({ min: 1, max: 10 })
		for (let i = 0; i < numComments; i++) {
			// Создаём нового пользователя для комментария
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			await prisma.videoComment.create({
				data: {
					text: faker.lorem.sentences(),
					userId: randomUser.id,
					videoId: video.id,
					createdAt: faker.date.between({ from: createdAt, to: new Date() })
				}
			})
		}

		// Генерируем случайное количество лайков (от 1 до 10)
		const numLikes = faker.number.int({ min: 1, max: 10 })
		const likedUserIds = new Set<string>()

		for (let i = 0; i < numLikes; i++) {
			// Создаём нового пользователя для лайка
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			if (!likedUserIds.has(randomUser.id)) {
				likedUserIds.add(randomUser.id)

				await prisma.videoLike.create({
					data: {
						userId: randomUser.id,
						videoId: video.id,
						createdAt: faker.date.between({ from: createdAt, to: new Date() })
					}
				})
			}
		}
	}
	console.log('Видео, комментарии, лайки и теги созданы.')

	console.log('Заполнение базы данных завершено успешно.')
}

main()
	.catch(e => {
		console.error('Ошибка при заполнении базы данных:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
