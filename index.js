const express = require("express");
const env = require("dotenv");
const { connectDB } = require("./utils/connectDB");
const PORT = process.env.PORT || 8081;
env.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

const taskRoutes = require("./routes/task");
app.use("/api/tasks", taskRoutes);


app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));