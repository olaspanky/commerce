"use client"
import { useEffect, useState } from "react";
import Head from "next/head";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
        const url = `https://api.buttercms.com/v2/content/products/?auth_token=${process.env.API_TOKEN}`;
        const res = await fetch(url);
      const { data } = await res.json();
      const allProducts = data;
      console.log("all product:", allProducts)
    }
    getPosts();
  }, []);
  return (
    <div >
      {/* <Head>
        <title>Butter Store</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.21/default/snipcart.css"
        />
      </Head>
      <main >
        <h3>
          Welcome to <a href="/">Butter Store!</a>
        </h3>
        <p >World's best Online store 😎</p>
        <div >
          {posts.length > 0
            ? posts.map((p) => {
                return (
                  <div key={p.id} >
                    <img
                      style={{ "max-width": "100%" }}
                      src={p.image}
                      alt={`Preview of ${p.name}`}
                    />
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <p>${p.price}</p>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      </main>
      <footer >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo"  />
        </a>
      </footer>
       */}
    </div>
  );
}