<template>
    <div ref="target">
        <div class="w-full border border-[#d9a56f]/50 mb-2 hover:cursor-pointer hover:bg-[#f0e8cc]" @click="openInfoNews">
            <div class="flex">
                <div class="w-[130px] h-[130px]">
                    <img ref="img" class="w-full h-full" alt="cover image">
                </div>
                <div class="px-2 w-full">
                    <div>
                        <a class="font-bold text-lg line-clamp-3">
                            {{ news.title }}
                        </a>
                    </div>
                    <div>
                        <!-- @ts-ignore -->
                        <p class="text-sm  text-[#d9a56f]">{{ news.updateBy }}</p>
                        <p class="text-sm">{{ news.updateAt }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useLazyload } from 'vue3-lazyload';
import { News } from '@/types';

const props = defineProps<{
    news: News
}>();

const target = ref<HTMLElement>();

const imgLoaded = ref(false);
const img = useLazyload(ref(props.news.cover), {
    lifecycle: { loaded: (el) => (imgLoaded.value = true) },
});

const openInfoNews = () => {
    const url = props.news.link
    window.open(url, '_blank')
}
</script>
<style></style>