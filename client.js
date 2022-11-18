import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { REACT_APP__SANITY_PROJECT_ID, REACT_APP__SANITY_TOKEN } from "@env";

export const client = sanityClient({
  projectId: REACT_APP__SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-07-03",
  useCdn: true,
  token: REACT_APP__SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
