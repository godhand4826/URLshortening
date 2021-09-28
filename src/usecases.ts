import UserUC from './usecase/user'
import LinkUC from './usecase/link'
import UserRepo from './repo/orm/userRepo'
import LinkRepo from './repo/orm/linkRepo'

const usecases = {
	userUC: new UserUC(new UserRepo()),
	linkUC: new LinkUC(new LinkRepo())
}

export default usecases