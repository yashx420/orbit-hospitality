const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const dataFile = path.join(__dirname, "src", "data", "projects.ts");
const contactFile = path.join(__dirname, "src", "pages", "Contact.tsx");
const ribbonFile = path.join(
  __dirname,
  "src",
  "components",
  "sections",
  "RoomRibbon.tsx",
);

const targetDirs = [
  "Orbit Serviced Apartments",
  "Orbit Villas",
  "Orbit Party Venue",
  "projects",
];
const filesToUpdate = [dataFile, contactFile, ribbonFile];

let fileContents = filesToUpdate.map((file) => fs.readFileSync(file, "utf8"));

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

targetDirs.forEach((subDir) => {
  const oldDirPath = path.join(publicDir, subDir);
  if (!fs.existsSync(oldDirPath)) return;

  const newSubDir = slugify(subDir);
  const newDirPath = path.join(publicDir, newSubDir);

  if (!fs.existsSync(newDirPath)) {
    fs.mkdirSync(newDirPath, { recursive: true });
  }

  const propertyDirs = fs.readdirSync(oldDirPath);

  propertyDirs.forEach((propDir) => {
    const oldPropPath = path.join(oldDirPath, propDir);
    if (!fs.statSync(oldPropPath).isDirectory()) return;

    const newPropDir = slugify(propDir);
    const newPropPath = path.join(newDirPath, newPropDir);

    if (!fs.existsSync(newPropPath)) {
      fs.mkdirSync(newPropPath, { recursive: true });
    }

    const images = fs.readdirSync(oldPropPath);
    images.forEach((img) => {
      const oldImgPath = path.join(oldPropPath, img);
      if (!fs.statSync(oldImgPath).isFile()) return;

      const ext = path.extname(img);
      const name = path.basename(img, ext);
      const newImgName = slugify(name) + ext.toLowerCase();

      const newImgPath = path.join(newPropPath, newImgName);

      // Copy file instead of renaming to avoid EPERM on open directory handles in Windows
      if (!fs.existsSync(newImgPath)) {
        fs.copyFileSync(
          oldImgPath,
          newImgName.includes("(") ? oldImgPath : oldImgPath,
        ); // No-op but safe
        fs.copyFileSync(oldImgPath, newImgPath);
      }

      // Update references
      const oldUrl = `/${subDir}/${propDir}/${img}`;
      const newUrl = `/${newSubDir}/${newPropDir}/${newImgName}`;

      fileContents = fileContents.map((content) =>
        content.split(oldUrl).join(newUrl),
      );
    });
  });
});

filesToUpdate.forEach((file, index) => {
  fs.writeFileSync(file, fileContents[index], "utf8");
});

console.log(
  "Finished copying and renaming assets. All references in components and data files updated.",
);
