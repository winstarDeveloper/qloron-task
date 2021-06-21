const express = require("express");
const appController = require("./../controllers/appController");

const appRouter = express.Router();

appRouter.route("/").get(appController.getData).post(appController.addData);
appRouter
  .route("/:id")
  .patch(appController.updateData)
  .delete(appController.deleteData);

module.exports = appRouter;
