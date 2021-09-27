import { User, Link } from '../entity';
import ILinkRepo from '../repo/linkRepo'

class LinkUC {
	linkRepo: ILinkRepo;

	constructor(linkRepo: ILinkRepo,) {
		this.linkRepo = linkRepo;
	}

	async createLink(user: User, origin: string):Promise<Link> {
		const _ = new URL(origin) // verify URL
		const link = new Link()
		link.user = user
		link.origin = origin
		link.shorten = random()
		return this.linkRepo.create(link)
	}

	async redirect(shorten: string): Promise<string> {
		const link = await this.linkRepo.getByShorten(shorten)
		return link!.origin
	}
}

function random() {
	const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return Array().fill(null).map(() => base62[Math.floor(Math.random() * 62)]).join('')
}

export default LinkUC