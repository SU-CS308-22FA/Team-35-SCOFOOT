import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// ----------- deployment -----------
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "..", "client", "build", "index.html")
		);
	});
}

// ----------- deployment -----------

app.use(notFound);
app.use(errorHandler);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
