import express from "express";
import { extractPdf } from "../functions/pdfFunctions.js";
import uploadPdf from "../lib/uploadPdf.js";

const pdf = express.Router();
pdf.route("/pdf-reader").post(uploadPdf.single("file"),extractPdf);
export default pdf;
