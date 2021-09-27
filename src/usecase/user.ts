import { User } from '../entity/User';
import IUserRepo from '../repo/userRepo'

class UserUC {
	userRepo: IUserRepo;

	constructor(userRepo: IUserRepo) {
		this.userRepo = userRepo;
	}

	async createUser(name: string, password: string): Promise<User> {
		const user = new User()
		user.name = name
		user.password = password
		return this.userRepo.create(user)
	}

	async login(name: string, password: string): Promise<User | undefined> {
		return this.userRepo.getByNameAndPassword(name, password)
	}
}

export default UserUC