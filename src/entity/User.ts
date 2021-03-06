import { OneToMany, Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Link } from '.';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", unique: true })
	name: string;

	@Column("varchar")
	password: string;

	@OneToMany(() => Link, link => link.user)
	links: Link[];
}
