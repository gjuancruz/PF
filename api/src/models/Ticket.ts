// import { RandomUUIDOptions } from 'crypto';
import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';
// import { UUIDV4, UUID } from 'sequelize/types';

@Table({timestamps: false})
export class Ticket extends Model<Ticket> {
    @AllowNull(false)
    @Column({primaryKey: true , type: DataType.INTEGER })
    id!: number;

}