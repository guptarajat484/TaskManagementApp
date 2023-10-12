require("./models/db-connection");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require("./routers/user-router");
const taskRouter = require('./routers/task-router')
app.use(express.json());

app.use(userRouter);
app.use(taskRouter)


app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
