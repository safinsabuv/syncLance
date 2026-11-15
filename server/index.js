import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from '../server/config/db.js';
import projectRouter from '../server/routes/projectsRouter.js';
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT;
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRouter);

//error handler afer all routes
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
