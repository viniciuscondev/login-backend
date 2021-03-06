import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export default User;
