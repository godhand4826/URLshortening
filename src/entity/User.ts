import { Link } from './Link';
import { OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	name: string;

	@Column("varchar")
	password: string;

	@OneToMany(() => Link, link => link.user)
	links: Link[];
}
