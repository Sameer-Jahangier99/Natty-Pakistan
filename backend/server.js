const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
const ErroMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./Routes/userRoutes");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api Working");
});

// routes
app.use("/user", userRoutes);

app.use(ErroMiddleware.notFound);
app.use(ErroMiddleware.errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
