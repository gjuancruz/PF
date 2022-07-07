import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';
// import { UUIDV4, UUID } from 'sequelize/types';

@Table({timestamps: false})
export class Sale extends Model<Sale> {
    @AllowNull(false)
    @Column({primaryKey: true , type: DataType.INTEGER })
    id!: number;

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