import mongoose, { Document, Schema } from "mongoose";

interface TicketDoc extends Document {
  price: number;
  title: string;
  userId: string;
}

const ticketSchema = new Schema<TicketDoc>(
  {
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    userId: {
      type: String,
      required: [true, "UserId is required"],
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Ticket = mongoose.model<TicketDoc>("Ticket", ticketSchema);