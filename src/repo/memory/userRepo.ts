import { User } from 'entity'
import IUserRepo from '../userRepo'

class UserRepo implements IUserRepo {
	id: number
	db: Map<number, User>

	constructor() {
		this.id = 0
		this.db = new Map()
	}
	create(user: User): Promise<User> {
		user.id = ++this.id
		this.db.set(user.id, user)
		return Promise.resolve(user)
	}

	getByNameAndPassword(name: string, password: string): Promise<User | undefined> {
		for (const [_, user] of this.db) {
			if (user.name === name && user.password === password) {
				return Promise.resolve(user)
			}
		}
		return Promise.resolve(undefined)
	}
}

export default UserRepo