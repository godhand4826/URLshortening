import LinkUC, { random } from './link'
import { Link, User } from '../entity'
import LinkRepo from '../repo/memory/linkRepo'

const origin = "https://www.google.com/"
const origin2 = "https://tw.yahoo.com/"
const origin3 = "https://www.youtube.com/"

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

test('get links', async () => {
	const linkUC = new LinkUC(new LinkRepo())
	const user = new User()
	user.id = 10
	await linkUC.createLink(user, origin)
	await linkUC.createLink(user, origin2)
	await linkUC.createLink(user, origin3)
	const links = await linkUC.getLinks(user)
	expect(links.find(link => link.origin === "foo")).toBeUndefined()
	expect(links.find(link => link.origin === origin)).not.toBeUndefined()
	expect(links.find(link => link.origin === origin2)).not.toBeUndefined()
	expect(links.find(link => link.origin === origin3)).not.toBeUndefined()
})

test('test random function', () => {
	expect(new Set(Array(10).fill(null).map(() => random())).size).toEqual(10)
})