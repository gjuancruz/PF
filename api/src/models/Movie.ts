// import { RandomUUIDOptions } from 'crypto';
import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull, ForeignKey} from 'sequelize-typescript';
// import { UUIDV4, UUID } from 'sequelize/types';

@Table({timestamps: false})
export class Movie extends Model<Movie> {
    @Column({primaryKey: true , defaultValue: DataType.UUIDV4, type: DataType.UUID })
    id!: string;

    @AllowNull(false)
    @Column({type: DataType.CHAR(30)})
    Title!: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    Plot!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Genre!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Actors!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Language!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Director!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Release!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Poster!: string

    @AllowNull(false)
    @Column({type: DataType.CHAR(15)})
    Rated!: string;

    @AllowNull(false)
    @Column({type: DataType.CHAR(100)})
    Trailer!: string;

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    Runtime!: number;

    //relacion tabla

    // @AllowNull(false)
    // @Column({type: DataType.INTEGER,})
    // showid!: number;

    // @CreatedAt
    // @Column
    // createdAt!: Date;

    // @UpdatedAt
    // @Column
    // updatedAt!: Date;

}