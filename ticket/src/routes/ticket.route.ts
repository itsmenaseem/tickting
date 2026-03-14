import { Router } from "express";
import { createTicket, getTicketById, getTicketsByTitle, updateTicket } from "../controllers/ticket.controller";
import { authMiddleware, checkValidationResult } from "@tcuts/common";
import { body } from "express-validator";
const router = Router();

// create ticket 

router.post("/",authMiddleware,
    [
     body("title")
     .notEmpty()
     .trim()
     .isLength({min:3,max:200})
     .withMessage("Title should be atleast 3 char long and can have maximum size 200 char"),
     body("price")
     .notEmpty()
     .isFloat({min:0})
     .withMessage("Price must be positive number")
    ],
    checkValidationResult,
    createTicket);

// update ticket 

router.patch("/:id",authMiddleware,
     [body("title")
     .optional()
     .trim()
     .isLength({min:3,max:200})
     .withMessage("Title should be atleast 3 char long and can have maximum size 200 char"),
     body("price")
     .optional()
     .isFloat({min:0})
     .withMessage("Price must be a non-negative number")
    ],
    checkValidationResult
    ,updateTicket);

// get ticket by id

router.get("/:id",getTicketById);

// get ticket by title => title will passed as query , /api/tickets?title=avengers


router.get("/",getTicketsByTitle)

export {router as ticketRoute};