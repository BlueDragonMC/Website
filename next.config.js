/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: '/p/about',
        destination: '/about',
        permanent: true
      },
      {
        source: '/d/9-rules',
        destination: '/page/rules',
        permanent: true
      },
      {
        source: '/d/8-games',
        destination: '/games',
        permanent: true
      },
      {
        source: '/t/announcements',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/u/:user',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/t/information',
        destination: '/about',
        permanent: true
      },
      {
        source: '/t/blog',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/d/16-20220902-leaderboard-update',
        destination: '/blog/2022-09-02-leaderboard-update',
        permanent: true
      },
      {
        source: '/d/11-new-game-infinijump',
        destination: '/blog/new-game-infinijump',
        permanent: true
      },
      {
        source: '/d/14-acknowledgements',
        destination: '/page/oss',
        permanent: true
      },
      {
        source: '/d/17-20220917-stability-improvements',
        destination: '/blog/2022-09-17-stability-improvements',
        permanent: true
      },
      {
        source: '/d/15-20220828-fastfall-update',
        destination: '/blog/2022-08-28-fastfall-update',
        permanent: true
      },
      {
        source: '/d/18-20220924-lobby-update',
        destination: '/blog/2022-09-24-lobby-update',
        permanent: true
      },
      {
        source: '/d/19-20221003-cosmetics-update',
        destination: '/blog/2022-10-03-cosmetics-update',
        permanent: true
      },
      {
        source: '/d/20-20221028-infinijump-cosmetics',
        destination: '/blog/2022-10-28-infinijump-cosmetics',
        permanent: true
      },
      {
        source: '/d/22-20221230-new-infinijump-mode',
        destination: '/blog/2022-12-30-new-infinijump-mode',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
