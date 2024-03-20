import { createClient } from "next-sanity"
import  ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "hwyf4d5u",
    dataset: "production",
    apiVersion: "2024-02-04",
    useCdn: true,
});

const builder = ImageUrlBuilder(client)

export function urlfor(source){
    return builder.image(source)
}