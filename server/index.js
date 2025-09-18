const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const applicationRoute = require("./routes/application.route");
const savedJobsRoute = require("./routes/savedJob.route");
const analyticsRoute = require("./routes/analytics.route");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

/* middleware to handle cors */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methode: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res) => {
  res.status(200).send("hello new request.");
});

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);
app.use("/api/save-jobs", savedJobsRoute);
app.use("/api/analytics", analyticsRoute);

/* serve uploads folder */
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

/* start server */
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
