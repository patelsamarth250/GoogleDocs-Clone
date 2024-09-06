const userNotFound: Array<ResponseMessage> = [
    {
        msg: "Your email or password is inccorrect",
    },
];

const emailNotVerified: Array<ResponseMessage> = [
    {
        msg: "Please verify your email before loggin in",
    }
]

const resetPassword: Array<ResponseMessage> = [
    {
        msg: "If a user with that email exists, you will receive a email with instruction to reset your password"
    }
]

export {userNotFound, emailNotVerified, resetPassword}