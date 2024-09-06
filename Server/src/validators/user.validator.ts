import { body } from "express-validator";
import { userService } from "../services/user.services";


class UserValidator{
    public register = [
        // this part handles the email validation
        body("email").isEmail().normalizeEmail().withMessage("Must enter Valid email address"),
        body("email").custom(async (value) => {
            const user = await userService.findUserByEmail(value);
            if(user)
            {
                return Promise.reject("User with email already exists");
            }
            return true;
        }),
        // this part will handle the Password validation
        body("password1").isLength({min: 8,max: 25})
            .withMessage("Password should be between 8 to 25 chars"),
        body("password1").matches(/\d/)
        .withMessage("Password must contain Atleast one number"),
        body("password2").custom( (value,{req}) => {
            if(value !== req.body.password1){
                throw new Error("Passwords must watch");
            }
            return true;
        })
    ]

    public resetPassword = [
        // checks wheater while updating the email, correct new email is provided or not
        body("email").isEmail().normalizeEmail().withMessage("Must provide a valid email")
    ]

    public confirmResetPassword = [
        body("password1")
          .isLength({ min: 8, max: 25 })
          .withMessage("Password must be between 8 to 25 characters."),
        body("password1")
          .matches(/\d/)
          .withMessage("Password must contain atleast 1 number"),
        body("password2").custom((value, { req }) => {
          if (value !== req.body.password1) {
            throw new Error("Passwords must match.");
          }
          return true;
        }),
      ];

}

const userValidator = new UserValidator();
export {userValidator}