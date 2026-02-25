const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "data", "projects.ts");

let content = fs.readFileSync(filePath, "utf8");

// Regex to specifically target image paths inside quotes.
// They typically start with `/Orbit ` or `/path/` and end with `.jpg`, `.jpeg`, `.png`, etc.
const imagePathRegex =
  /"((\/Orbit(?: Serviced Apartments| Villas)?\/[^"]+\.(?:jpg|jpeg|png)))"/g;

let matchCount = 0;
const updatedContent = content.replace(imagePathRegex, (match, p1) => {
  matchCount++;
  // Split the path, encode each segment, then rejoin.
  // We don't use encodeURI() directly because we want to preserve the slashes.
  const encodedPath = p1
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `"${encodedPath}"`;
});

console.log(`Updated ${matchCount} image paths.`);

fs.writeFileSync(filePath, updatedContent, "utf8");
