import fs from "fs";

const data = JSON.parse(fs.readFileSync("./images_update.json", "utf8"));
let content = fs.readFileSync("src/data/projects.ts", "utf8");

function replaceImages(id, newImages) {
  const regex = new RegExp(
    `(id:\\s*"${id}"[\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\][\\s\\S]*?heroImage:\\s*)([^,}]+)`,
    "g",
  );
  content = content.replace(regex, (match, p1, p2, p3, p4) => {
    const newImagesStr = newImages.map((img) => `      "${img}",`).join("\n");
    const newHero = `"${newImages[0]}"`;
    return `${p1}\n${newImagesStr}\n    ${p3}${newHero}`;
  });
}

replaceImages("orbit-begonia", data.begonia);
replaceImages("orbit-celosia", data.celosia);
replaceImages("orbit-lavender-luxe", data.lavender);
replaceImages("white-lotus-hotels", [
  ...data.begonia,
  ...data.celosia,
  ...data.lavender,
]);

fs.writeFileSync("src/data/projects.ts", content);
console.log("Update complete");
