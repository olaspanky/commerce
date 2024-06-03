import { createClient } from "next-sanity"
import  ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "hwyf4d5u",
    dataset: "production",
    apiVersion: "2024-03-04",
    useCdn: false,
});

const builder = ImageUrlBuilder(client)

export function urlFor(source){
    return builder.image(source)
}