require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/auth.route");
const cors = require("cors");
const UserRoute = require("./routes/user.route");
const ShopRoute = require("./routes/shop.route");
const ItemRoute = require("./routes/item.route");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRoute);
app.use("/api/shop", ShopRoute);
app.use("/api/item", ItemRoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Run on PORT ${PORT}`);
});
