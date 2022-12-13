module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://dailybuzzs.com/",
        permanent: true,
      },
      {
        source: "/:slug",
        destination: "https://dailybuzzs.com/:slug",
        permanent: true,
      },
    ];
  },
};
