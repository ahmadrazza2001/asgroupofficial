const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./server/config/dbConfig");
const port = process.env.PORT || 5000;

const usersRoute = require("./server/routes/usersRoute");
const newsRoute = require("./server/routes/productsRoute");
const bidsRoute = require("./server/routes/bidsRoute");
const notificationsRoute = require("./server/routes/notificationsRoute");
const achieversRoute = require("./server/routes/achieversRoute");
const businessRoute = require("./server/routes/businessRoute");
//const cors = require("cors");
/*app.use(
  cors({
    origin: ["https://asgroupofficial.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);*/

app.use("/api/users", usersRoute);
app.use("/api/news", newsRoute);
app.use("/api/achievers", achieversRoute);
app.use("/api/business", businessRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);

// deployment config
/*const path = require("path");
__dirname = path.resolve();*/

/*if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}*/

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`server started on port ${port}`));
