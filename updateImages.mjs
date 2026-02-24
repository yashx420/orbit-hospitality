import fs from "fs";
import path from "path";

const properties = [
  {
    id: "peace-lily",
    folder:
      "Orbit Serviced Apartments/Peace Lily_Smart-Lit Open Terrace Stay_3BHK_AC_BBQ",
  },
  {
    id: "tulip-villa",
    folder: "Orbit Villas/Tulip Villa By Orbit Hospitality",
  },
  {
    id: "white-lotus",
    folder:
      "Orbit Serviced Apartments/White Lotus Penthouse_OpenTerrace_3BHK_AC_BBQ_",
  },
  {
    id: "orbit-begonia",
    folder:
      "Orbit Serviced Apartments/Orbit Begonia Luxe _ 3BHK _ AC _ Wi-Fi _ Balcony",
  },
  {
    id: "orbit-iris",
    folder:
      "Orbit Serviced Apartments/Orbit Iris _ 3BHK _ AC _ Wi-Fi _ Near Mall of Asia",
  },
  {
    id: "orbit-petunia",
    folder:
      "Orbit Serviced Apartments/Orbit Petunia Luxe _3BHK_Hebbal_10 Min From Mall Of Asia",
  },
  {
    id: "orbit-browallia",
    folder:
      "Orbit Serviced Apartments/Orbit Browallia Luxe _ 2BHK _ Near Nagavara",
  },
  {
    id: "orbit-celosia",
    folder:
      "Orbit Serviced Apartments/Orbit Celosia Luxe _2BHK_Hebbal_10 Min From Aster",
  },
  {
    id: "orbit-lavender-luxe",
    folder:
      "Orbit Serviced Apartments/Orbit Lavender Luxe _ 2BHK _ AC _ Hebbal _",
  },
];

const projectsFilePath = path.join(process.cwd(), "src", "data", "projects.ts");
let fileContent = fs.readFileSync(projectsFilePath, "utf8");

properties.forEach((prop) => {
  const dirPath = path.join(process.cwd(), "public", prop.folder);
  if (fs.existsSync(dirPath)) {
    const files = fs
      .readdirSync(dirPath)
      .filter(
        (f) =>
          f.endsWith(".jpg") ||
          f.endsWith(".jpeg") ||
          f.endsWith(".png") ||
          f.endsWith(".JPG") ||
          f.endsWith(".PNG") ||
          f.endsWith(".webp"),
      );
    const imagePaths = files.map(
      (f) => `"/${prop.folder.replace(/\\/g, "/")}/${f}"`,
    );

    // Create new array string
    const newImagesArray = `images: [\n      ${imagePaths.join(",\n      ")}\n    ]`;

    // Replace the images array in the file for this specific property
    // We match `id: "prop.id"` up to `images: [...]`
    const propRegex = new RegExp(
      `(id: "${prop.id}"[\\s\\S]*?)images:\\s*\\[[\\s\\S]*?\\],?`,
      "g",
    );
    fileContent = fileContent.replace(propRegex, `$1${newImagesArray},`);
  } else {
    console.log("Directory not found:", dirPath);
  }
});

fs.writeFileSync(projectsFilePath, fileContent);
console.log("Successfully updated projects.ts");
