const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require("./app");
const mongoose = require('mongoose');

const DB = process.env.DB_CONN_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)
  .replace('<USERNAME>', process.env.DATABASE_USERNAME)
  .replace('<DB_NAME>', process.env.DB_NAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB Connection successful');
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server listening on Port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION: Shutting down the Application");
  console.log(err.name, " : ", err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION: Shutting down the Application");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
