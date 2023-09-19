<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const loading = useLoading();

nuxtApp.hook('app:mounted', () => {
    loading.value[0] = false;
});

useSeoMeta({
    title: 'Anime Release Schedule | Momics'
})
</script>

<template >
    <div class="min-h-screen flex flex-col mt-6">
        <main>
            <ClientOnly>
                <AniDayTab />
                <AniAnime />
            </ClientOnly>
        </main>
    </div>
</template>
