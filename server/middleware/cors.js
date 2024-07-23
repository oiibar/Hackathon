import cors from "cors";

const corsOptions = {
  origin: ["https://hackathon-cli.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
