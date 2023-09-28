/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const externals = {
      ...config.externals,
      bcrypt: "bcrypt",
      jimp: "jimp",
      "probe-image-size": "probe-image-size",
    };
    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...rules],
      },
      externals,
    };
  },
};

module.exports = nextConfig;
