
import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';

@Table({timestamps: false})
export class Comment extends Model<Comment> {
    @AllowNull(false)
    @Column({primaryKey: true , type: DataType.INTEGER })
    id!: number;

    @AllowNull(false)
    @Column({type: DataType.TEXT })
    text!: number;

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