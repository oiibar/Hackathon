import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";

const app = express();
const port = 5000;
app.use(
  cors({
    origin: "ttps://hackathon2-beta.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//https://hackathon2-beta.vercel.app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server on localhost:${port}`);
});

export default app;
