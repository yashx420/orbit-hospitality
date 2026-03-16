import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "78cxu1v9",
  dataset: "property",
  useCdn: false, // Changed to false to ensure live updates are visible immediately
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
