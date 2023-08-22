import dotenv from "dotenv";
import http from "http";
import express from "express";
import "express-async-errors";
import { createServer } from "http";
import authentication from "./routes/authentication.js";
import cors from "cors";
import helmet from "helmet";
import { uploadImage } from "./functions/main.js";
import path from "path";
import verifyToken from "./middleware/verifyUser.js";
import bodyParser from "body-parser";
import upload from "./lib/upload.js";
import { fileURLToPath } from "url";
import category from "./routes/category.js";
import product from "./routes/product.js";
import variants from "./routes/variants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'static/admin/build')));
// app.get('/app', async (req, res) => {
//   res.sendFile(path.join(__dirname, 'static/admin/build/index.html'));
// });

app.use("/images", express.static("functions/images"));
app.use("/icon", express.static("icon"));
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
app.use("/uploadImage", [verifyToken, upload.single("image")], uploadImage);


const httpServer = createServer(app);
const port = process.env.PORT || 1300;
const server = http.createServer({
  port: 1400,
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
