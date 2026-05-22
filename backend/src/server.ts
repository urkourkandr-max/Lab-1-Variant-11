import express from "express";
import cors from "cors";

import dutiesRoutes from "./routes/duties.routes";
import userRoutes from "./routes/user.routes";

import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/duties", dutiesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: "Not Found"
    });
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});