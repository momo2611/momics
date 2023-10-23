// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-swiper",
    "@vueuse/motion/nuxt",
    "@nuxtjs/robots",
    "@vite-pwa/nuxt",
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      newsURL: process.env.NEWS_URL,
    },
  },
  security: {
    rateLimiter: {
      tokensPerInterval: 150,
      interval: "hour",
      fireImmediately: false,
      throwError: false,
    },
    hidePoweredBy: false,
  },
  routeRules: {
    "/api/anime/**": { isr: 60 * 15 },
    "/api/anime": { redirect: "/api/anime/0" },
  },
  pwa: {
    manifest: {
      name: "Momics | Read comics online",
      short_name: "Momics",
      description: "Read comics online",
      lang: "en",
      icons: [
        {
          src: "icons/64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
