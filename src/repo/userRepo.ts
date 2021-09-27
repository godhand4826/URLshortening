import { User } from '../entity/User'

interface UserRepo {
	create(user: User): Promise<User>
	getByNameAndPassword(name: string, password: string): Promise<User | undefined>
}

export default UserRepo