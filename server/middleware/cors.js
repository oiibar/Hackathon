import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
