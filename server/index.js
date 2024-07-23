import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: ["https://hackathon-cli.vercel.app"], // Allow your frontend domain
//     credentials: true, // Allow credentials if needed
//     optionsSuccessStatus: 200,
//   })
// );
app.options(
  "*",
  cors({
    origin: "https://hackathon-cli.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/info", infoRoutes);

app.listen(port, () => {
  console.log(`Server on localhost:${port}`);
});

export default app;
