<template>
  <div class="mt-4 flex flex-col sm:flex-row justify-between mx-3 gap-2">
    <div class="w-full">
      <NewsArticle v-for="newAni in data.news" :news="newAni" :key="newAni.id" />
    </div>
    <div class="w-full sm:w-[480px] border-l border-[#d9a56f]/50 h-full border-gray-300">
      <h1 class="pl-2 text-3xl font-fold mb-4 text-[#d9a56f]">Release Anime</h1>
      <div class="w-full">
        <NewsAniArticle v-for="ani in data.newAnime" :news="ani" :key="ani.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const url = config.public.baseURL
const data = ref([])

const fetchData = async () => {
  try {
    // const response = await fetch(`${url}/daily-news`);
    const response = await fetch(`http://localhost:8081/daily-news`);
    if (response.ok) {
      const apiData = await response.json();
      data.value = apiData;
      console.log(data);
    } else {
      console.error('Error fetching data from the API');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style></style>