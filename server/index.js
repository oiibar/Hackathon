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
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

//https://hackathon2-beta.vercel.ap

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server on localhost:${port}`);
});

export default app;
