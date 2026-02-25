import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js to compile to static HTML/CSS files
  output: 'export',

  // Ensure pages are exported as folder/index.html for better compatibility
  trailingSlash: true,

  // AlterVista doesn't have a Node server to optimize images dynamically,
  // so we must tell Next.js to serve images as standard static files.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
