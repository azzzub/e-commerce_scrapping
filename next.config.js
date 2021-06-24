module.exports = {
  images: {
    domains: ['cf.shopee.co.id', 'ecs7-p.tokopedia.net', 'images.tokopedia.net']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
