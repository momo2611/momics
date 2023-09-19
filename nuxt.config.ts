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
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
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
  devtools: { enabled: true },
});
