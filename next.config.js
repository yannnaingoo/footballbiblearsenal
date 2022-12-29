module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://footballbiblearsenal.com/",
        permanent: true,
      },
       {
         source: "/:slug",
         destination: "footballbiblearsenal.com/:slug",
         permanent: true,
      },
    ];
  },
};
