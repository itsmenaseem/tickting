import express , {Request,Response} from "express";
import authRoutes from "./routes/auth.route"
import cookieParser from "cookie-parser"
import { connectToDB } from "./configs/db.config";
import  "express-async-error"
import "dotenv/config"
import { errorMiddleware } from "@tcuts/common";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.get("/test", (req:Request, res:Response) => {
  res.send("Hello World!");
}); 
app.use("/api/auth",authRoutes);

app.use(errorMiddleware)

async function startServer(){
    try {
        // await connectToDB();
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();