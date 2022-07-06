// import { RandomUUIDOptions } from 'crypto';
import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';
// import { UUIDV4, UUID } from 'sequelize/types';

@Table({timestamps: false})
export class Room extends Model<Room> {
    @AllowNull(false)
    @Column({primaryKey: true , type: DataType.INTEGER })
    id!: number;

    // @Column({type: DataType.INTEGER,})
    // @AllowNull(false)
    // showid!: number;

    // @CreatedAt
    // @Column
    // createdAt!: Date;

    // @UpdatedAt
    // @Column
    // updatedAt!: Date;

}