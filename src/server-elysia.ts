import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'

const db = new PrismaClient()

const app = new Elysia()
	.use(swagger())
	.model({ 
        'badlist.add': t.Object({
			username: t.String(),
			rating: t.Numeric({
				minimum: 0,
				maximum: 10
			}),
			kdratio: t.Optional(t.String())
		})
    }) 
	
	.get('/data', async () => {
		const users = await db.user.findMany()
		return users
	})
	.get('/badlist', async () => {
		const users = await db.badPlayers.findMany()
		return users
	})
	.post(
		'/badlist',
		async ({ body }) =>
			db.badPlayers.create({
				data: body,
				select: {
					id: true,
					username: true
				}
			}),
		{
			body: 'badlist.add',
			response: t.Object({
				id: t.Number(),
				username: t.String()
			})
		}
	)
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)