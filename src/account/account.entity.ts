import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('accounts')
export default class AccountEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string;

    @Column({ default: 0 })
    amount: number;
}