const express = require("express");
const app = express();
const appRouter = require("./routes/appRoutes");
const globalErrorHandler = require("./controllers/errorController");

// Body parser, reading data from body into req.body
app.use(express.json());

// Set route paths
app.use("/api", appRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
