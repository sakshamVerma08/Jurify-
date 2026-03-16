/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  turbopack: {
    resolveAlias: {
      "@prisma/client-runtime-utils":
        "./node_modules/@prisma/client-runtime-utils",
    },
  },
};

export default nextConfig;
