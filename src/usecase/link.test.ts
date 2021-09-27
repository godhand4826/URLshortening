import LinkUC from './link'
import { User } from '../entity'
import LinkRepo from '../repo/memory/linkRepo'

const origin = "https://www.google.com/"

test('create a link', async () => {
	const repo = new LinkRepo()
	const linkUC = new LinkUC(repo)
	const link = await linkUC.createLink(new User(), origin)
	expect(link.id).toBe(1)
	expect(repo.db.size).toBe(1)
})

test('create a invalid link', async () => {
	const repo = new LinkRepo()
	const linkUC = new LinkUC(repo)
	const user = new User()
	await expect(async () => await linkUC.createLink(user, "some/wrong/url"))
		.rejects
		.toThrow()
})

test('redirect to origin', async () => {
	const linkUC = new LinkUC(new LinkRepo())
	const link = await linkUC.createLink(new User(), origin)
	const actual = await linkUC.redirect(link.shorten)
	expect(actual).toEqual(origin)
})

test('redirect not found', async () => {
	const linkUC = new LinkUC(new LinkRepo())
	await expect(async () => await linkUC.redirect("not/exist/shorten"))
		.rejects
		.toThrow()
})