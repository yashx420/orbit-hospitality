import fs from "fs";
import path from "path";
import crypto from "crypto";

const properties = [
  "Orbit Serviced Apartments/Peace Lily_Smart-Lit Open Terrace Stay_3BHK_AC_BBQ",
  "Orbit Villas/Tulip Villa By Orbit Hospitality",
  "Orbit Serviced Apartments/White Lotus Penthouse_OpenTerrace_3BHK_AC_BBQ_",
  "Orbit Serviced Apartments/Orbit Begonia Luxe _ 3BHK _ AC _ Wi-Fi _ Balcony",
  "Orbit Serviced Apartments/Orbit Iris _ 3BHK _ AC _ Wi-Fi _ Near Mall of Asia",
  "Orbit Serviced Apartments/Orbit Petunia Luxe _3BHK_Hebbal_10 Min From Mall Of Asia",
  "Orbit Serviced Apartments/Orbit Browallia Luxe _ 2BHK _ Near Nagavara",
  "Orbit Serviced Apartments/Orbit Celosia Luxe _2BHK_Hebbal_10 Min From Aster",
  "Orbit Serviced Apartments/Orbit Lavender Luxe _ 2BHK _ AC _ Hebbal _",
];

properties.forEach((prop) => {
  const dirPath = path.join(process.cwd(), "public", prop);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    const hashes = new Set();

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (!fs.statSync(filePath).isFile()) return;
      if (!file.match(/\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG)$/)) return;

      const fileBuffer = fs.readFileSync(filePath);
      const hashSum = crypto.createHash("sha256");
      hashSum.update(fileBuffer);
      const hex = hashSum.digest("hex");

      if (hashes.has(hex)) {
        console.log(`Deleting duplicate: ${filePath}`);
        fs.unlinkSync(filePath);
      } else {
        hashes.add(hex);
      }
    });
  }
});

console.log("Finished removing duplicates.");
