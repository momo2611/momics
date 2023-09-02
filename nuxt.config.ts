// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-swiper"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  devtools: { enabled: true },
});
