import { Router } from "express";
import { authValidator } from "../validators/auth.validator";
import { authcontroller } from "../controllers/auth/auth.controller";
import { authenticate } from "../middleware/auth";


const router = Router();
 
router.post('/login', authValidator.login, authcontroller.login)

router.post('/refresh-token', 
    authValidator.refreshToken,
    authcontroller.refresToken
);

router.delete('/logout',authenticate, authcontroller.logout );

export default router;