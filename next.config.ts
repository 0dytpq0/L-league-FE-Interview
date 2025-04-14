import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["d2559sqcuyrr6z.cloudfront.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2559sqcuyrr6z.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
