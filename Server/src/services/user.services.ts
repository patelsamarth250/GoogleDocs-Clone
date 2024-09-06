import { compare, genSalt, hash } from "bcrypt";
import { User } from "../db/models/user.model";
import  jwt  from "jsonwebtoken";
import { UserRole } from "../db/models/user-role.model";
import { RefreshToken } from "../db/models/refresh-token.model";
import { mailservice } from "./mail.service";
import env from "../config/env.config";
class UserService {

    // cheks if user exists already
    public findUserByEmail = async (email: string): Promise<User | null> => {
        const user = await User.findOne({where: {email}});
        return user;
    }

    // creates a new User and hashes password and creates a JWT token
    public createUser = async(email: string, password: string) => {
        if(await this.findUserByEmail(email)){
          console.log("Already exists!");
          return ;
        }
        
        const salt = await genSalt();
        const hashedPassword = await hash(password,salt);
        const verificationToken = jwt.sign({email},env.VERIFY_EMAIL_SECRET);
        const user = await User.create({
            email: email,
            password: hashedPassword,
            verificationToken: verificationToken,
        });
        
        // call method to send email for verification
        await this.sendVerificationEmail(user);
        
    }

    private sendVerificationEmail = async (user: User) => {
        const mail = {
          from: "satyampundir03@gmail.com",
          to: user.email,
          subject: "Welcome to Google Docs",
          text: `click the following link to verify your email : http://localhost:3000/user/verify-email/${user.verificationToken}`,
        };
    
        await mailservice.sendMail(mail);
    };

    public sendPasswordResetEmail = async (user: User) => {
        const mail = {
          from: "satyampundir03@gmail.com",
          to: user.email,
          subject: "Reset your password!",
          text: `http://localhost:3000/user/reset-email/${user.passwordResetToken}`,
        };
    
        await mailservice.sendMail(mail);
      };
    
    

    public checkPassword = async (user:User, password: string): Promise<boolean> =>{
        return await compare(password, user.password);
    };

    public getRequestUser = async(
        user: User | RequestUser 
    ): Promise<RequestUser> => {
        if(user instanceof User){
            const userWithRoles = await User.scope('withRoles').findByPk(user.id)
            const roles = userWithRoles?.userRoles.map((UserRole)=>UserRole.role.name)
            return{
                id: user.id,
                email: user.email,
                roles: roles
            } as RequestUser
        }else return user;  
    }

    public generateAuthResponse = async (
        user: RequestUser | User
    ) : Promise<TokenPair> => {
        const requestUser = await this.getRequestUser(user)

        const accessToken = jwt.sign(requestUser,env.ACCESS_TOKEN_SECRET,{
            expiresIn: '24h'
        })

        const refreshToken = jwt.sign(requestUser,env.REFRESH_TOKEN_SECRET,{
            expiresIn: '24h'
        })

        await RefreshToken.destroy({
            where: {userId: requestUser.id}
        })

        await RefreshToken.create({token: refreshToken, userId: requestUser.id});

        return {accessToken, refreshToken}
    }

    // check wheather the refresh token is active or not:

    public getIsTokenActive = async(token: string) : Promise<boolean> =>{
        const refreshToken = await RefreshToken.findOne({
            where: {token},
        });
        return refreshToken != null;
    };

    public logoutUser = async (userId: number) =>{
        await RefreshToken.destroy({
            where:{
                userId,
            },
        })
    }

    public findUserById = async (id: number):Promise<User | null> => {
        const user = await User.findByPk(id);
        return user;
    }

    public resetPassword = async (user: User) => {
        const passwordResetToken = jwt.sign(
            {
                id:user.id, email: user.email
            },
            "password_reset",
            {
                expiresIn: '24h',
            }
        );

        await user.update({passwordResetToken})
        // send password reset email method should be called
        await this.sendPasswordResetEmail(user);
    }

    // find the user with the given reset pass token
    public findUserByPasswordResetToken = async (
        email: string,
        passwordResetToken: string
      ): Promise<User | null> => {
        const user = await User.findOne({
          where: {
            email,
            passwordResetToken,
          },
        });
    
        return user;
      };
    
      public updatePassword = async (user: User, password: string) => {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        await user.update({
          password: hashedPassword,
        });
      };
    
    // it is used while verifying the email
      public findUserByVerificationToken = async (
        email: string,
        verificationToken: string
      ): Promise<User | null> => {
        const user = await User.findOne({
          where: {
            email,
            verificationToken,
          },
        });
    
        return user;
      };
    
      public updateIsVerified = async (user: User, isVerified: boolean) => {
        await user.update({
          isVerified,
        });
      };


}

// created and object to export and use in other places
const userService = new UserService();

export {userService};