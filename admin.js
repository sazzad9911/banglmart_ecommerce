
import admin from "firebase-admin"
import path from "path";
import { fileURLToPath } from "url";
import { readFile, readFileSync } from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccount=readFileSync(path.join(__dirname,"serviceAccountKey.json"),"utf8")
//console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: "https://banglamart-8ea6a-default-rtdb.firebaseio.com"
});
export default admin