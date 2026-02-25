const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "src", "data", "projects.ts");
const ribbonFile = path.join(
  __dirname,
  "src",
  "components",
  "sections",
  "RoomRibbon.tsx",
);

function fixContent(content) {
  return (
    content
      .replace(/\/Orbit Serviced Apartments\//g, "/orbit-serviced-apartments/")
      .replace(/\/Orbit Villas\//g, "/orbit-villas/")
      .replace(/\/Orbit Party Venue\//g, "/orbit-party-venue/")
      .replace(/\/Orbit Hotels\//g, "/orbit-hotels/")
      .replace(/\/projects\/Peace Lily\//g, "/projects/peace-lily/")
      .replace(/\/projects\/Tulip Villa\//g, "/projects/tulip-villa/")
      .replace(/\/projects\/White lotus\//g, "/projects/white-lotus/")
      // Fix specific property names that might have spaces
      .replace(
        /Peace Lily_Smart-Lit Open Terrace Stay_3BHK_AC_BBQ/g,
        "peace-lily_smart-lit-open-terrace-stay_3bhk_ac_bbq",
      )
      .replace(
        /Tulip Villa By Orbit Hospitality/g,
        "tulip-villa-by-orbit-hospitality",
      )
      .replace(
        /White Lotus Penthouse_OpenTerrace_3BHK_AC_BBQ_/g,
        "white-lotus-penthouse_openterrace_3bhk_ac_bbq_",
      )
      // Fix specific file names with spaces/parentheses
      .replace(/\(1\)\.jpeg/g, "-1.jpeg")
      .replace(/\(2\)\.jpeg/g, "-2.jpeg")
      .replace(/\(3\)\.jpeg/g, "-3.jpeg")
      .replace(/\(4\)\.jpeg/g, "-4.jpeg")
      .replace(/\(5\)\.jpeg/g, "-5.jpeg")
      .replace(/ \(/g, "-")
      .replace(/\)/g, "")
  );
}

[dataFile, ribbonFile].forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    let fixed = fixContent(content);
    fs.writeFileSync(file, fixed, "utf8");
  }
});

console.log("Bulk fix applied to projects.ts and RoomRibbon.tsx");
