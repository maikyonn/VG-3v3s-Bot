import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'

const db = new PrismaClient()

const app = new Elysia()
	.use(swagger())
	.model({ 
        'badlist.add': t.Object({
			username: t.String(),
			rating: t.Nullable(t.Numeric({
				minimum: 0,
				maximum: 10
			})),
			kdratio: t.Nullable(t.String())
		})
    }) 
	.onError(({ code, error }) => {
        return new Response(error.toString())
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
		async ({ body }) => {
			await db.badPlayers.create({
				data: body,
				select: {
					username: true
				}
			})
		},
		{
			body: 'badlist.add',
		}
	)
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)


export type App  = typeof app