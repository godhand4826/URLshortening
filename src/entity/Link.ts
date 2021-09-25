import { User } from './User'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Link extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	origin: string;

	@Column("varchar")
	shorten: string;

	@ManyToOne(() => User, user => user.links)
	user: User;
}
