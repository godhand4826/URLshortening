import UserUC from './user'
import UserRepo from '../repo/memory/userRepo'

test('create a user', async () => {
	const repo = new UserRepo()
	const userUC = new UserUC(repo)
	const user = await userUC.createUser("eric", "password")
	expect(user.id).toBe(1)
	expect(repo.db.size).toBe(1)
})

test('login success', async () => {
	const repo = new UserRepo()
	const userUC = new UserUC(repo)
	const user = await userUC.createUser("eric", "password")
	let out = await userUC.login("eric", "password")
	expect(out).not.toBe(undefined)
	out = out!
	expect(user.name).toBe(out.name)
	expect(user.password).toBe(out.password)
})

test('login failed', async () => {
	const repo = new UserRepo()
	const userUC = new UserUC(repo)
	const user = await userUC.createUser("eric", "password")
	let out = await userUC.login("wrong", "password")
	expect(out).toBe(undefined)
	out = await userUC.login("eric", "wrong")
	expect(out).toBe(undefined)
})