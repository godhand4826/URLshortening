import { Link } from '../../entity';
import ILinkRepo from '../linkRepo'

class LinkRepo implements ILinkRepo {
	create(link: Link): Promise<Link> {
		return link.save()
	}
	getByOwner(userID: number): Promise<Link[]> {
		return Link.find({ user: { id: userID } })
	}
	getByID(id: number): Promise<Link | undefined> {
		return Link.findOne(id)
	}
	getByShorten(shorten: string): Promise<Link | undefined> {
		return Link.findOne({ shorten })
	}
	update(link: Link): Promise<Link> {
		return link.save()
	}
	delete(id: number): Promise<void> {
		Link.delete(id)
		return Promise.resolve();
	}
}

export default LinkRepo