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

  // Disable production source maps to avoid leaking source maps into static deployment
  productionBrowserSourceMaps: false,

  // Compiler options: strip console.log / warn in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Package import optimization for lucide-react to avoid loading whole icon barrel files
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
