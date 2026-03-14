import express , {Request,Response} from "express";
import cookieParser from "cookie-parser"
import  "express-async-error"
import "dotenv/config"
import { errorMiddleware } from "@tcuts/common";
import { ticketRoute } from "./routes/ticket.route";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.get("/test", (req:Request, res:Response) => {
    console.log(process.env.JWT_KEY);
  res.send("Hello World!");
});

app.use("/api/tickets",ticketRoute);
app.use(errorMiddleware)
export {app};