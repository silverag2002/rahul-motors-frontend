import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One address for Google: www.rahulmotors.in moves permanently to rahulmotors.in.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rahulmotors.in" }],
        destination: "https://rahulmotors.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
