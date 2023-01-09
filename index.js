// imports
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./models/index");
//
const errorHandler = require("./middlewares/error.middleware.js");
// configs
dotenv.config();
//
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "10mb",
  })
);
app.use(express.static("assets"));
app.use("/product_images", express.static("images"));
//
const port = process.env.PORT || 5000;
// routes imports and use
const manufacturerRoutes = require("./routes/manufacturer");
const categoryRoutes = require("./routes/category");
const vendorRoutes = require("./routes/vendor");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/po_master");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu.route");
const locationRoutes = require("./routes/location.route");
const grnRoutes = require("./routes/grn.route");
//
app.use("/dashboard/", manufacturerRoutes);
app.use("/dashboard/", categoryRoutes);
app.use("/dashboard/", vendorRoutes);
app.use("/dashboard/", productRoutes);
app.use("/dashboard/", orderRoutes);
app.use("/dashboard/", authRoutes);
app.use("/dashboard/", menuRoutes);
app.use("/dashboard/", locationRoutes);
app.use("/dashboard/grn/", grnRoutes);
//
app.use(errorHandler);
//
app.listen(port, () => {
  // sequelize.sync({ force: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  // sequelize.sync({ alter: true }).then(() => {
  //   console.log("Database Synced!");
  // });
  //
  // sequelize.sync().then(() => {
  //   console.log("Database Synced!");
  // });
  //
  sequelize.authenticate();
  console.log("Database Connected");
  //
  console.log("Server started at port "+port);
});
