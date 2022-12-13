import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter();
  // const { asPath } = useRouter();
  // const origin =
  //   typeof window !== "undefined" && window.location.origin
  //     ? window.location.origin
  //     : "";

  // const URL = `${origin}`;

  useEffect(() => {
    if (post[0]?.slug) {
      router.push(`https://dailybuzzs.com/${post[0]?.slug}`);
    }
  }, [post[0]?.slug]);

  return (
    <div>
      <Head>
        <title>{post[0]?.title?.rendered}</title>
        <meta name="title" content={post[0]?.title?.rendered} />
        <meta name="description" content="" />
        <meta property="og:title" content={post[0]?.title?.rendered} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={post[0]?.og_image?.url} />
        <meta
          property="og:url"
          content={`https://dailybuzzs.vercel.app/${post[0]?.slug}`}
        />
      </Head>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const res = await fetch(
    `https://dailybuzzs.com/wp-json/wp/v2/posts?slug=${slug}`
  );
  console.log(res, "restt");
  const post = await res.json();
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://dailybuzzs.com/wp-json/wp/v2/posts/");
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}
