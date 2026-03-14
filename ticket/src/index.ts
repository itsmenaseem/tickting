import { app } from "./app";



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