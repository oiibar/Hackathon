import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const port = 5000;
const app = express();
app.use(
  cors({
    origin: "https://hackathon2-gold.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server on localhost:${port}`);
});

export default app;
