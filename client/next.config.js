/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/app/components/ImageLoader.js",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/api/v1/product/product-photo/**",
      },
    ],
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     loader: "custom",
//     loaderFile: "./my/image/loader.js",
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "example.com",
//         port: "",
//         pathname: "/account123/**",
//       },
//     ],
//   },
// };
