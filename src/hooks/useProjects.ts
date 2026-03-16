import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanityClient";
import type { Property } from "../types/property";

const PROJECTS_QUERY = `*[_type == "property"] | order(order asc, _createdAt desc) {
  "id": slug.current,
  title,
  category,
  location,
  bedrooms,
  bathrooms,
  description,
  amenities,
  "heroImage": heroImage.asset->url,
  "images": images[].asset->url
}`;

export function useProjects() {
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sanityClient
      .fetch<Property[]>(PROJECTS_QUERY)
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}

export function useProject(id: string | undefined) {
  const { projects, loading, error } = useProjects();
  const project = projects.find((p) => p.id === id) || null;
  return { project, loading, error };
}
