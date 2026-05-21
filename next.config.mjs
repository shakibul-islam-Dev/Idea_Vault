/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // গুগল প্রোফাইল ইমেজের জন্য
      },
      {
        protocol: "https",
        hostname: "**", // অন্য যেকোনো সোর্স থেকে ইমেজ লোড করার অনুমতি
      },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
