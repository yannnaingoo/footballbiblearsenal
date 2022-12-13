export default function Home() {
  return <div></div>;
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const res = await fetch(`https://dailybuzzs.com/wp-json/wp/v2/posts?${slug}`);
  const posts = await res.json();
  return {
    props: {
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
