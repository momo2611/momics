<script lang="ts" setup>
import { Comic, Genre } from '@/types';

const currentGenre = ref<string>('');
const comics = ref<Comic[]>([]);
const totalPages = ref<number>(0);
const genres = ref<Genre[]>([]);
const isFetching = ref<boolean>(false);

const router = useRouter();
const route = useRoute();


const handleChangeGenre = async (genreId: string) => {
  currentGenre.value = genreId;
  router.replace({
    query: {
      type: genreId,
    },
  });
};

const getComics = async (genreId: string, page: number) => {
  try {
    isFetching.value = true;
    const data = await useFetchData(`/genres/${genreId}?page=${page}`);
    comics.value = data?.comics;
    totalPages.value = data?.total_pages;
    console.log(comics.value, route);
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isFetching.value = false;
  }
};

const page = route.query.page;
const p = page && !isNaN(+page) ? Number(route.query.page) : 1;
const type = route.query.type;
currentGenre.value = type ? String(type) : '';
const [comicsData, genresData] = await Promise.all([
  getComics(currentGenre.value, p),
  useFetchData('/genres'),
]);

const initSlide = genresData.findIndex(
  (genre: any) => genre.id === route.query.type
);
if (initSlide === -1 || !comicsData) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
genres.value = genresData;

// watch((route), async (route) => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
//   const page = route.query.page;
//   const p = page && !isNaN(+page) ? Number(page) : 1;
//   const genre = route.query.type ? String(route.query.type) : 'all';
//   await getComics(genre, p);
// });

watch(() => route.query, async (newQuery, oldQuery) => {
  if (newQuery.type !== oldQuery.type) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const genre = route.query.type ? String(route.query.type) : 'all';
    await getComics(genre, 1);
  } else if (newQuery.page !== oldQuery.page) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const page = route.query.page;
    const p = route.query.page && !isNaN(+route.query.page) ? Number(page) : 1;
    const genre = route.query.type ? String(route.query.type) : 'all';
    await getComics(genre, p);
  }
})
</script>

<template>
  <Head>
    <Title>{{
      `${genres.find((genre: any) => genre.id === currentGenre)?.name +
        ` - Page ${route.query.page ?? 1}` || 'Genres'
        } | Momics`
    }}</Title>
    <Meta name="description" :content="genres.find((genre: any) => genre.id === currentGenre)?.description
        || 'Đọc truyện tranh online miễn phí'
        " />
  </Head>
  <main class="max-w-6xl mx-auto px-3">
    <h2 class="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl text-[#d9a56f] font-bold mb-4 mt-4 md:mt-8">
      <Icon name="fa-solid:crown" size="36" class="text-[#d9a56f]" />
      Genres
    </h2>
    <Swiper slides-per-view="auto" :loop="false" class="border-y" :modules="[SwiperFreeMode, SwiperNavigation]"
      :free-mode="true" :initial-slide="initSlide">
      <SwiperSlide v-for="genre in genres" :key="genre.id" :class="`swiper-slide-genre px-5 py-3 select-none cursor-pointer ${genre.id === currentGenre ? 'bg-[#d9a56f] text-white' : ''
        }`" @click="handleChangeGenre(genre.id)">
        {{ genre.name }}
      </SwiperSlide>
    </Swiper>
    <p class="my-5 flex items-center gap-2 py-2 px-3 rounded bg-[#8a8372] text-white">
      <Icon name="fluent:info-16-filled" size="30" class="w-full max-w-[30px]" />
      {{ genres?.find((genre: any) => genre.id === currentGenre)?.description }}
    </p>
    <ComicsPagination :comics="comics" :total-pages="totalPages" :is-fetching="isFetching" />
  </main>
</template>

<style scoped>
.swiper-slide-genre {
  width: max-content !important;
}
</style>
