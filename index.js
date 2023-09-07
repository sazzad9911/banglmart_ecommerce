import dotenv from "dotenv";
import http from "http";
import express from "express";
import "express-async-errors";
//import { createServer } from "http";
import authentication from "./routes/authentication.js";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import verifyToken from "./middleware/verifyUser.js";
import bodyParser from "body-parser";
import upload from "./lib/upload.js";
import { fileURLToPath } from "url";
import category from "./routes/category.js";
import product from "./routes/product.js";
import variants from "./routes/variants.js";
import fs from "fs";
import { Server } from "socket.io";
import store from "./routes/store.js";
import { createServer } from "http";
import {
  getResult,
  resizeImages,
  uploadImages,
} from "./lib/uploadController.js";
import support from "./routes/support.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");

dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: false }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'static/admin/build')));
// app.get('/app', async (req, res) => {
//   res.sendFile(path.join(__dirname, 'static/admin/build/index.html'));
// });

app.use("/images", express.static("functions/images"));
app.use("/icon", express.static("icon"));
app.use("/upload", express.static("upload"));
//app.use('/admin', express.static(path.join(__dirname, 'static/admin/build')))
// app.get('/admin', (req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'})
//   res.sendFile(path.join(__dirname, '/static/admin/build/index.html'));
//   res.end()
// })
app.use("/auth", authentication);
app.use("/category", category);
app.use("/product", product);
app.use("/variant", variants);
app.use("/store", store);
app.use("/support", support);
app.post("/uploadImages", uploadImages, resizeImages, getResult);

const httpServer = createServer({ key: key, cert: cert }, app);
const port = process.env.PORT || 1300;
// const server = http.createServer({
//   port: 1400,
// });
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //console.log("connection")
});
const start = async () => {
  try {
    app.set("port", port);
    httpServer.listen(app.get("port"), function () {
      var port = httpServer.address().port;
      console.log("Running on : ", port);
    });
    //orderWorker.init();
    //initilize synchronized processes
  } catch (error) {
    console.log(error);
  }
};
start();
