import Head from "next/head";
// import { useRouter } from "next/router";

export default function Post({ slug }) {
  // const { asPath } = useRouter();
  // const origin =
  //   typeof window !== "undefined" && window.location.origin
  //     ? window.location.origin
  //     : "";

  // const URL = `${origin}`;

  return (
    <div>
      <Head>
        {/* <meta property="og:url" content={`${URL}/${asPath}`} /> */}
        <meta
          property="og:url"
          content={`https://dailybuzzs.vercel.app/${slug}`}
        />
      </Head>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const res = await fetch(`https://dailybuzzs.com/wp-json/wp/v2/posts?${slug}`);
  const posts = await res.json();
  return {
    props: {
      slug,
      posts,
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
