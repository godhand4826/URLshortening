import { Link } from 'entity'
import ILinkRepo from '../linkRepo'

class LinkRepo implements ILinkRepo {
	id: number
	db: Map<number, Link>
	constructor() {
		this.id = 0
		this.db = new Map()
	}
	create(link: Link): Promise<Link> {
		link.id = ++this.id
		this.db.set(link.id, link)
		return Promise.resolve(link)
	}
	getByOwner(ownerID: number): Promise<Link[]> {
		const result: Link[] = []
		for (const [_, link] of this.db) {
			if (link.user.id === ownerID) {
				result.push(link)
			}
		}
		return Promise.resolve(result)
	}
	getByID(id: number): Promise<Link | undefined> {
		return Promise.resolve(this.db.get(id))
	}
	getByShorten(shorten: string): Promise<Link | undefined> {
		for (const [_, link] of this.db) {
			if (link.shorten === shorten) {
				return Promise.resolve(link)
			}
		}
		return Promise.resolve(undefined)
	}
	update(link: Link): Promise<Link> {
		this.db.set(link.id, link)
		return Promise.resolve(link)
	}
	delete(id: number): Promise<void> {
		this.db.delete(id)
		return Promise.resolve()
	}
}

export default LinkRepo