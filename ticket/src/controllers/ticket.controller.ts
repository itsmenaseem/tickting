import { Request, Response } from "express";
import { Ticket } from "../models/ticket.model";
import { BadRequestError , ForbiddenError, NotFoundError, UnauthorizedError } from "@tcuts/common";
import mongoose from "mongoose";


export async  function createTicket(req:Request,res:Response){
    const {title,price} = req.body;
    const userId = req.user?.id;
    if(!userId)throw new UnauthorizedError();
    const ticket = await Ticket.create({
        title,
        price,
        userId
    })
    return res.status(201).send({ticket});
}


export async function updateTicket(req: Request, res: Response) {
    const ticketId = req.params?.id;

    if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId.toString())) {
        throw new BadRequestError("Please provide a valid ticketId");
    }

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");

    if (ticket.userId !== req.user?.id) {
        throw new ForbiddenError("You are forbidden from this action");
    }

    const { title, price } = req.body;

    if (title) ticket.title = title;
    if (price) ticket.price = price;

    await ticket.save();

    return res.status(200).send({ticket});
}


export async  function getTicketById(req: Request, res: Response){
    const ticketId = req.params?.id;
    if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId.toString())) {
        throw new BadRequestError("Please provide a valid ticketId");
    }
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) throw new NotFoundError("Ticket not found");
    return res.status(200).send({ticket});
}




export async function getTicketsByTitle(req: Request, res: Response) {
  try {
    const { title } = req.query as { title?: string };
    
    let offset = 0;
    let limit = 10; 

    if (req.query.offset) {
      const parsedOffset = parseInt(req.query.offset as string);
      if (!isNaN(parsedOffset) && parsedOffset >= 0) offset = parsedOffset;
    }

    if (req.query.limit) {
      const parsedLimit = parseInt(req.query.limit as string);
      if (!isNaN(parsedLimit) && parsedLimit > 0) limit = parsedLimit;
    }

    // Build query
    const query: any = {};
    if (title) {
      query.title = { $regex: new RegExp(title as string, "i") }; // case-insensitive partial match
    }

    const tickets = await Ticket.find(query)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    const total = await Ticket.countDocuments(query);

    res.status(200).send({
      tickets,
      offset,
      limit,
      total,
    });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}
