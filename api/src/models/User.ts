import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';
// import { UUIDV4, UUID } from 'sequelize/types';

@Table({timestamps: false})
export class User extends Model<User> {
    @Column({primaryKey: true , defaultValue: DataType.UUIDV4, type: DataType.UUID })
    id!: string;

    @AllowNull(false)
    @Column({type: DataType.CHAR(20)})
    username!: string;

    @AllowNull(false)
    @Column({type: DataType.CHAR(20)})
    password!: string;

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    role!: number;

    // @Column({type: DataType.INTEGER,})
    // @AllowNull(false)
    // ticketid!: number;

    // @CreatedAt
    // @Column
    // createdAt!: Date;

    // @UpdatedAt
    // @Column
    // updatedAt!: Date;

}