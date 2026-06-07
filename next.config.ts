import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images are served from Wikimedia Commons via Special:FilePath, which
    // 302-redirects to upload.wikimedia.org. Loading them unoptimized lets the
    // browser follow that redirect directly and avoids the optimizer rejecting
    // a cross-host redirect.
    unoptimized: true,
  },
};

export default nextConfig;
