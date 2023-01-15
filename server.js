const http = require("http");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("API is now listening on port ${PORT}!");
});
