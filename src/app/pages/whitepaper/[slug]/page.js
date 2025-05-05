import { notFound } from "next/navigation";
import BlogCard from "@/app/components/blogCard";

// Static whitepaper data (replace with MongoDB fetch if needed)
const whitepapers = [
  {
    id: "1",
    title: "Winning in Anti-Malaria Segment through Innovation",
    image: "free",
    slug: "whitepaper-1",
    price: "Free",
    pdf: "The Case of Amatem Nn.pdf",
  },
  {
    id: "2",
    title: "Another Whitepaper",
    image: "art",
    slug: "whitepaper-2",
    price: "Free",
    pdf: "Another Whitepaper.pdf",
  },
];

// Optional: Fetch from MongoDB
async function fetchWhitepapers() {
  const { MongoClient } = require("mongodb");
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  try {
    const whitepapers = await db.collection("whitepapers").find().toArray();
    return whitepapers;
  } finally {
    await client.close();
  }
}

export default async function WhitepaperPage({ params }) {
  const { slug } = params;

  // Use static data or fetch from MongoDB
  // const whitepapers = await fetchWhitepapers(); // Uncomment to use MongoDB
  const whitepaper = whitepapers.find((wp) => wp.slug === slug);

  if (!whitepaper) {
    notFound(); // Renders 404 page if whitepaper not found
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{whitepaper.title}</h1>
      <p className="mb-4">{whitepaper.price || "Free"}</p>
      <BlogCard whitepapers={whitepapers} preselectedWhitepaperId={whitepaper.id} />
    </div>
  );
}

// Generate static paths for pre-rendering (optional, similar to getStaticPaths)
export async function generateStaticParams() {
  // Use static data or fetch from MongoDB
  // const whitepapers = await fetchWhitepapers(); // Uncomment to use MongoDB
  return whitepapers.map((wp) => ({
    slug: wp.slug,
  }));
}