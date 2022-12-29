import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

export default function Post({ post }) {
  const router = useRouter();

  useEffect(() => {
    if (post[0]?.slug) {
      router.push(`https://footballbiblearsenal.com/${post[0]?.slug}`);
    }
  }, [post[0]?.slug]);

  return (
    <div>
      <Head>
        <title>{post[0]?.title?.rendered}</title>
        <meta name="title" content={post[0]?.title?.rendered} />
        <meta name="description" content="" />
        <meta
          property="og:title"
          content={post[0]?.yoast_head_json?.og_title}
        />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content={post[0]?.yoast_head_json?.og_image[0]?.url}
        />
        <meta
          property="og:url"
          content={`https://footballbiblearsenal.vercel.app/${post[0]?.slug}`}
        />
      </Head>
    </div>
  );
}

// export async function getStaticProps({ params }) {
//   const slug = params.slug;
//   const res = await axios.get(
//     `https://footballbiblearsenal.com/wp-json/wp/v2/posts?slug=${slug}`
//   );
//   const post = res?.data;
//   return {
//     props: {
//       post,
//     },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths() {
//   const res = await axios.get(
//     "https://footballbiblearsenal.com/wp-json/wp/v2/posts?_embed&per_page=100"
//   );
//   const posts = res?.data;
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }));
//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const res = await axios.get(
    `https://footballbiblearsenal.com/wp-json/wp/v2/posts?slug=${slug}`
  );
  const post = res?.data;
  return {
    props: {
      post,
    },
  };
}
