import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'chart.js',
      'framer-motion',
      'react-chartjs-2',
      'date-fns',
      'swiper',
    ],
  },
  images: {
    // Bypass Next's built-in /_next/image optimizer entirely. Instead, route every
    // <Image> through lib/image-loader.ts, which asks Supabase Storage's own
    // transformation API to resize/compress. This removes the Next server from the
    // critical path, which is what was causing the "500 in 7.1s" cold-start timeouts.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "wneonnqavtbwziybbxaq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "znqknsqwgoqrzoefqrwe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "mbmnsmzllagmbkvlnfwt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bangalorecollective.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.bangalorecollective.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 5184000,
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
  output: "standalone",
  trailingSlash: true,
  async headers() {
    // These public images have stable filenames. Let browsers reuse them for a
    // day without contacting the CDN; rename a file when it must update sooner.
    // Keep HTML, API responses and downloads on their existing cache policies.
    const publicImages = [
      "/2ndbanner.jpg",
      "/ban.png",
      "/banglorecollectivelogo.jpg",
      "/banglorelogo.jpeg",
      "/banglorelogo.webp",
      "/banner.png",
      "/banner01.jpg",
      "/coachbrand.jpg",
      "/download.jpg",
      "/file.svg",
      "/globe.svg",
      "/icon-background.png",
      "/icon-foreground.png",
      "/icon-only.png",
      "/logowhite.png",
      "/next.svg",
      "/path-to-your-bag-image.jpg",
      "/path-to-your-men-image.jpg",
      "/path-to-your-stole-image.jpg",
      "/phto.png",
      "/phto.webp",
      "/removebglogo.png",
      "/splash.png",
      "/vercel.svg",
      "/whatsappicons.png",
      "/whatsicon.png",
      "/whatsicon.webp",
      "/window.svg",
    ];
    return publicImages.map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
    }));
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/userinterface/home/',
        permanent: true,
      },
      {
        source: '/product/:id',
        destination: '/userinterface/product/:id/',
        permanent: true,
      },
      {
        source: '/category/:id',
        destination: '/userinterface/category/:id/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;