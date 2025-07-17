const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codex-new.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin-backend-upload.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://js.stripe.com https://maps.googleapis.com http://maps.google.com https://www.google.com/recaptcha/api.js",
              "style-src 'self' 'unsafe-inline' https://js.stripe.com https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com https://js.stripe.com/type-font/Colfax-Medium.woff data: blob:",
              "connect-src 'self' http://localhost:3001 https://api.stripe.com https://maps.googleapis.com https://o145r4of4g.execute-api.us-east-1.amazonaws.com https://codexx-muyy-git-admin-soniikunals-projects.vercel.app",
              "frame-src https://js.stripe.com https://maps.googleapis.com https://www.google.com",
              "img-src 'self' data: https://admin-backend-upload.s3.us-east-2.amazonaws.com https://maps.googleapis.com https://maps.gstatic.com https://codex-new.s3.amazonaws.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
