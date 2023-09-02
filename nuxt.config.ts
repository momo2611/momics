// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-swiper", "nuxt-security"],
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
  devtools: { enabled: true },
});
