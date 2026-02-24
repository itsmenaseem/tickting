import express , {Request,Response} from "express";
import authRoutes from "./routes/auth.route"
import { errorMiddleware } from "./middlewares/error.middleware";
const app = express();


app.use(express.json());
app.get("/test", (req:Request, res:Response) => {
  res.send("Hello World!");
}); 


app.use("/api/auth",authRoutes);

app.use(errorMiddleware)
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});