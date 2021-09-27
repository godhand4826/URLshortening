import { Link } from '../entity/Link'

interface ILinkRepo {
	create(link: Link): Promise<Link>
	getByOwner(ownerID: number): Promise<Link[]>
	getByID(id: number): Promise<Link | undefined>
	getByShorten(shorten: string): Promise<Link | undefined>
	update(link: Link): Promise<Link>
	delete(id: number): Promise<void>
}

export default ILinkRepo