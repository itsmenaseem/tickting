import { Router  } from "express";
import { singup } from "../controllers/auth.controller";
import { body } from "express-validator";

const router = Router();


router.post("/signup",[
    body("email")
    .toLowerCase()
    .isEmail()
    .withMessage("Please provide valid email.")
],singup)

export default router;
