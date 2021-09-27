import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '.'

@Entity()
export class Link extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	origin: string;

	@Column({ type: "varchar", unique: true })
	shorten: string;

	@ManyToOne(() => User, user => user.links)
	user: User;
}
