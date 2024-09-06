
import { BelongsTo, Column, Model,DataType, ForeignKey, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "refresh_token", underscored: true })
class RefreshToken extends Model{

    @Column(DataType.STRING)
    token!: string;

    @ForeignKey(() => User)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

}

export {RefreshToken};