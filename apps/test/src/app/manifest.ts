import type { MetadataRoute } from "next";

import Manifest from "@acme/snippets/manifest";

export default function manifest(): MetadataRoute.Manifest {
  return Manifest;
}
