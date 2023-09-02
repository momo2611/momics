<script lang="ts" setup>
import { dynamicRoutes } from '@/utils/data';

const route = useRoute();

const routeData = dynamicRoutes.find((r) => r.path === route.path);
if (!routeData) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const comics = ref<any>();
const isFetching = ref<boolean>(false);

const getComics = async (page: number) => {
    try {
        isFetching.value = true;
        const data = await useFetchData(`${routeData?.apiPath}?page=${page}`);
        comics.value = data;
        return data;
    } catch (err) {
        console.log(err);
    } finally {
        isFetching.value = false;
    }
};

const page = route.query.page || 1;
const data = await getComics(Number(page));
if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

// watch(route, async (route) => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     const page = route.query.page || 1;
//     await getComics(Number(page));
// });
watch(() => route.query, async (newQuery, oldQuery) => {
    if (newQuery.page !== oldQuery.page) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = route.query.page || 1;
        const p = route.query.page && !isNaN(+route.query.page) ? Number(page) : 1;
        await getComics(p);
    }
})
</script>

<template>
    <Head>
        <Title>{{
            `${routeData
                ? `${routeData.title} - Page ${route.query.page ?? 1} | Momics`
                : 'Momics'
                }`
        }}</Title>
        <Meta name="description" content="Đọc truyện tranh online miễn phí" />
    </Head>
    <main class="max-w-6xl mx-auto px-3">
        <ComicsPagination :is-fetching="isFetching" :comics="comics?.comics" :total-pages="comics?.total_pages"
            :title="routeData?.title" :icon="routeData?.icon" />
    </main>
</template>