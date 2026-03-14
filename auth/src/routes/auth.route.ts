import { Router  } from "express";
import { login, profile, singup } from "../controllers/auth.controller";
import { body } from "express-validator";
import { authMiddleware, checkValidationResult } from "@tcuts/common";


const router = Router();


router.post("/signup",[
    body("email")
        .toLowerCase()
        .isEmail()
        .withMessage("Please provide valid email."),
    body("password")
        .trim()
        .isLength({min:8,max:20})
        .withMessage("Password must be alteast 8 character long and at max 20 character")
],
checkValidationResult,
singup)

router.post("/login",[
    body("email")
        .toLowerCase()
        .isEmail()
        .withMessage("Please provide valid email."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Please provide a password")
],
checkValidationResult,
login
)

router.get("/profile",authMiddleware,profile)

export default router;
