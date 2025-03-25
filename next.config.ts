import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async header() {
    return [
      {
        source: "/:path",
        headers: [
          {
              key: "Access-Control-Allow-Credentials",
              value: "true",
          },
      ],
      }
    ]
  }
};

export default nextConfig;
