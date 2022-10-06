// imports
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./models/index");
//
// configs
dotenv.config();
//
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
const port = process.env.PORT || 3002;
//
// routes imports and use
const manufacturerRoutes = require("./routes/manufacturer");
const categoryRoutes = require("./routes/category");
const vendorRoutes = require("./routes/vendor");
//
app.use("/dashboard/", manufacturerRoutes);
app.use("/dashboard/", categoryRoutes);
app.use("/dashboard/", vendorRoutes);
//
app.listen(port, () => {
  console.log("Server started at port 3001");
  sequelize.authenticate();
  console.log("Database Connected");
});
