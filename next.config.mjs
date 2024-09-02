/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/iniciar-sesion",
        destination: "/sign-in",
      },
      {
        source: "/registrarse",
        destination: "/sign-up",
      },
      {
        source: "/recuperar-clave",
        destination: "/password-recovery",
      },
      {
        source: "/restablecer-clave",
        destination: "/password-reset",
      },
      {
        source: "/productos",
        destination: "/products",
      },
      {
        source: "/productos/:slug",
        destination: "/products/:slug",
      },
      {
        source: "/findus",
        destination: "/encuentranos",
      },
    ];
  },
};

export default nextConfig;
