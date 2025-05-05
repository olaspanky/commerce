// src/app/form/page.js
"use client"
import ContactForm from "../../components/Contactform";
import { useSearchParams } from "next/navigation";

// Static whitepaper data (same as in blog and API)
const whitepapers = [
  {
    id: "1",
    title: "Winning in Anti-Malaria Segment through Innovation",
    pdf: "The Case of Amatem Nn.pdf",
  },
  {
    id: "2",
    title: "PBR Artemiter Final",
    pdf: "PBR-Artemiter-Final.pdf",
  },
];

export default function FormPage() {
  // Note: useSearchParams must be used in a Client Component or via getServerSideProps
  // For simplicity, we'll handle it in the component or fetch on server
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Download Your Whitepaper</h1>
      <ContactForm whitepapers={whitepapers} />
    </div>
  );
}