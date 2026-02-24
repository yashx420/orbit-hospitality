import fs from "fs";
import path from "path";

const projectsPath = "src/data/projects.ts";
let code = fs.readFileSync(projectsPath, "utf8");

const venues = ["peace-lily", "tulip-villa", "white-lotus"];

venues.forEach((key) => {
  // Add "Party Venues" to their category if it doesn't already exist.
  const regex = new RegExp(
    `(id:\\s*["'\`]${key}["'\`][\\s\\S]*?category:\\s*["'\`])([^"'\`]*)?(["'\`])`,
  );
  code = code.replace(regex, (match, p1, p2, p3) => {
    let currentCats = p2.trim();
    if (currentCats.includes("Party Venues")) return match;
    const newCats = currentCats
      ? `${currentCats}, Party Venues`
      : "Party Venues";
    return `${p1}${newCats}${p3}`;
  });
});

fs.writeFileSync(projectsPath, code);
console.log("Successfully added Party Venues to target categories.");
