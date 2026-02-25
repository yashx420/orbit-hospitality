const fs = require("fs");

const path = "src/data/projects.ts";
let content = fs.readFileSync(path, "utf8");

// The simplest and safest approach without regex groups:
// Replace all spaces, but ONLY for lines that look like they contain image paths.
const lines = content.split("\n");
const updatedLines = lines.map((line) => {
  // If the line is an image path inside an array or heroImage
  if (
    line.includes("/Orbit Serviced Apartments/") ||
    line.includes("/Orbit Villas/")
  ) {
    // encodeURI is generally safer for full paths, but here we can just safely replace space with %20
    // so we don't accidentally encode quotes or commas in the JS array syntax.
    // Instead, let's just find the content between the quotes.
    const match = line.match(/"([^"]+)"/);
    if (match) {
      const originalPath = match[1];
      const encodedPath = encodeURI(originalPath); // encodeURI encodes spaces to %20 but leaves / intact
      return line.replace(originalPath, encodedPath);
    }
  }
  return line;
});

fs.writeFileSync(path, updatedLines.join("\n"), "utf8");
console.log("Successfully updated image URLs in projects.ts");
