import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "78cxu1v9",
  dataset: "property",
  useCdn: false,
  apiVersion: "2024-01-01",
});

async function check() {
  const query = `*[_type == "property" && title match "White*"] {title, category, "slug": slug.current, _id}`;
  const results = await sanityClient.fetch(query);
  console.log("Results from Sanity:");
  console.log(JSON.stringify(results, null, 2));
}

check().catch(console.error);
