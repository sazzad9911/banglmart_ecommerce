import path from "path";
import { fileURLToPath } from "url";
import { v1 } from "uuid";
import { exportImages, exportImagesEvents } from "pdf-export-images";
import { promises as fsPromises } from "fs";
import { StatusCodes } from "http-status-codes";
import PDFParser from "pdf2json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = "https://banglamartecommerce.com.bd/images";
const local = "http://localhost:1300/images";

const getPdfPath = async (req, res) => {
  //const name = v1();
  const uploadDir = path.join(__dirname, "images/pdf");
  if (!fsPromises.readdir(uploadDir)) {
    await fsPromises.mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, `${req.file.originalname}`);
  await fsPromises.writeFile(filePath, req.file.buffer);
  return filePath;
};
const extractText = async (filePath) => {
  // Set up the pdf parser
  let pdfParser = new PDFParser(this, 1);

  // Load the pdf document
  pdfParser.loadPDF(filePath);

  // Parsed the patient
  let patient = await new Promise(async (resolve, reject) => {
    // On data ready
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      // The raw PDF data in text form
      const raw = pdfParser.getRawTextContent().replace(/--|Page\s*\(\d+\)|Break/g, '')
      //console.log(raw);
      // Return the parsed data
      resolve({
        nationalId: /National\sID(.*?)\r\n/i.exec(raw)?.[1].trim(),
        pin: /Pin(.*?)\r\n/i.exec(raw)?.[1].trim(),
        status: /Status(.*?)\r\n/i.exec(raw)?.[1].trim(),
        afisStatus: /Afis\sStatus(.*?)\r\n/i.exec(raw)?.[1].trim(),
        voterNo: /Voter\sNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
        formNo: /Form\sNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
        slNo: /Sl\sNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
        tag: /Tag(.*?)\r\n/i.exec(raw)?.[1].trim(),
        nameBangla: /Name\(Bangla\)(.*?)\r\n/i
          ?.exec(raw)?.[1]
          .trim(),
        nameEnglish: /Name\(English\)(.*?)\r\n/i.exec(raw)?.[1].trim(),
        dateOfBirth: /Date\sof\sBirth(.*?)\r\n/i.exec(raw)?.[1].trim(),
        birthPlace: /Birth\sPlace(.*?)\r\n/i.exec(raw)?.[1].trim(),
        birthRegNo: /Birth\sRegistration\sNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
        fatherName: /Father\sName(.*?)\r\n/i.exec(raw)?.[1].trim(),
        motherName: /Mother\sName(.*?)\r\n/i.exec(raw)?.[1].trim(),
        spouseName: /Spouse\sName(.*?)\r\n/i.exec(raw)?.[1].trim(),
        gender: /Gender(.*?)\r\n/i.exec(raw)?.[1].trim(),
        marital: /Marital(.*?)\r\n/i.exec(raw)?.[1].trim(),
        occupation: /Occupation(.*?)\r\n/i.exec(raw)?.[1].trim(),
        disability: /Disability(.*?)\r\n/i.exec(raw)?.[1].trim(),
        presentAddress: {
          division: /Division(.*?)Dis/i.exec(raw)?.[1].trim(),
          district: /District(.*?)\r\n/i.exec(raw)?.[1].trim(),
          rmo: /RMO(.*?)City/i.exec(raw)?.[1].trim(),
          cityCorporation: /City\sCorporation\sOr\s\r\nMunicipality(.*?)\r\n/i.exec(raw)?.[1].trim(),
          upozila: /Upozila(.*?)Union/i.exec(raw)?.[1].trim(),
          union:/Union\/Ward(.*?)\r\n/i.exec(raw)?.[1].trim(),
          mouza:/Mouza\/Moholla(.*?)Additional/i.exec(raw)?.[1].trim(),
          addMouza:/Additional\s\r\nMouza\/Moholla(.*?)\r\n/i.exec(raw)?.[1].trim(),
          ward:/(.*?)Village/i.exec(raw)?.[1].trim(),
          village:/Village\/Road(.*?)\r\n/i.exec(raw)?.[1].trim(),
          adVillage:/(.*?)Home\/HoldingNo/i.exec(raw)?.[1].trim(),
          home:/Home\/HoldingNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
          postOffice:/Post\sOffice(.*?)Post/i.exec(raw)?.[1].trim(),
          postalCode:/Postal\sCode(.*?)\r\n/i.exec(raw)?.[1].trim(),
          region:/Region(.*?)\r\n/i.exec(raw)?.[1].trim(),
        },
        permanentAddress: {
          division: /Division(.*?)Dis/i.exec(raw)?.[1].trim(),
          district: /District(.*?)\r\n/i.exec(raw)?.[1].trim(),
          rmo: /RMO(.*?)City/i.exec(raw)?.[1].trim(),
          cityCorporation: /City\sCorporation\sOr\s\r\nMunicipality(.*?)\r\n/i.exec(raw)?.[1].trim(),
          upozila: /Upozila(.*?)Union/i.exec(raw)?.[1].trim(),
          union:/Union\/Ward(.*?)\r\n/i.exec(raw)?.[1].trim(),
          mouza:/Mouza\/Moholla(.*?)Additional/i.exec(raw)?.[1].trim(),
          addMouza:/Additional\s\r\nMouza\/Moholla(.*?)\r\n/i.exec(raw)?.[1].trim(),
          ward:/(.*?)Village/i.exec(raw)?.[1].trim(),
          village:/Village\/Road(.*?)\r\n/i.exec(raw)?.[1].trim(),
          adVillage:/(.*?)Home\/HoldingNo/i.exec(raw)?.[1].trim(),
          home:/Home\/HoldingNo(.*?)\r\n/i.exec(raw)?.[1].trim(),
          postOffice:/Post\sOffice(.*?)Post/i.exec(raw)?.[1].trim(),
          postalCode:/Postal\sCode(.*?)\r\n/i.exec(raw)?.[1].trim(),
          region:/Region(.*?)\r\n/i.exec(raw)?.[1].trim(),
        },
        education:/Education(.*?)Education/i.exec(raw)?.[1].trim(),
      });
    });
  });
  return patient;
};

export const extractPdf = async (req, res) => {
  if (!req.file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid file" });
  }
  try {
    const filePath = await getPdfPath(req, res);
    const outDir = path.join(__dirname, "images/extract-images");
    const images = await exportImages(filePath, outDir);
    let extractedImages = [];
    images.map((img) => {
      const split = img.file.split("\\");
      const name = split[split.length - 1];
      extractedImages.push({
        url: `${url}/extract-images/${name}`,
        height: img.height,
        width: img.width,
      });
    });
    const data = await extractText(filePath);
    res.status(200).json({ extractedImages, data });
  } catch (error) {
    res.status(StatusCodes.EXPECTATION_FAILED).json(error);
  }
};
