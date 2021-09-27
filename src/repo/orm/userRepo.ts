import { User } from '../../entity';
import IUserRepo from '../userRepo'

class UserRepo implements IUserRepo {
	create(user: User): Promise<User> {
		return user.save()
	}

	getByNameAndPassword(name: string, password: string): Promise<User | undefined> {
		return User.findOne({ name, password })
	}
}

export default UserRepo;