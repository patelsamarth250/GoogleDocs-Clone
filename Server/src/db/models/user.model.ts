
import { Column, DataType, Table, Model, HasMany, BelongsTo, BelongsToMany, Scopes} from "sequelize-typescript";

import { RefreshToken } from "./refresh-token.model";
import { UserRole } from "./user-role.model";
import { Role } from "./role.model";
import { DocumentUser } from "./document-user.model";

@Scopes(() => ({
    withRoles:{
        include: [
            {
                model: UserRole,
                attributes: ['createdAt', 'updatedAt'],
                include: [Role]
            }
        ]
    }
}))


@Table({tableName:'user',underscored:true})
class User extends Model{
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!:string;

    @Column(DataType.BOOLEAN)
    isVerified!:boolean;

    @Column(DataType.STRING)
    verificationToken!: string;

    @Column(DataType.STRING)
    passwordResetToken!: string;

    @HasMany(() => RefreshToken, {
        onDelete: "CASCADE",
    })
    refreshTokens!: Array<RefreshToken>;

    @BelongsToMany(() => Role, {
        through:{
            model: () => UserRole
        }
    })
    roles!: Array<Role>

    @HasMany(() => UserRole,{
        onDelete: 'CASCADE'
    })
    userRoles!: Array<UserRole>


    @HasMany(() =>  DocumentUser,{
        onDelete: 'CASCADE'
    })
    sharedDocumnents!: Array<DocumentUser>

}

export {User};