<template>
    <div ref="target">
        <div class="w-full mb-2 pb-2 border-b border-[#d9a56f]/50 hover:cursor-pointer hover:bg-[#f0e8cc]"
            @click="openInfoNews">
            <div class="flex">
                <div class="px-2 w-full">
                    <div>
                        <a class="font-bold text-lg line-clamp-2">
                            {{ news.title }}
                        </a>
                    </div>
                    <div>
                        <p class="text-sm">{{ news.updateAt }}</p>
                    </div>
                </div>
                <div class="w-[120px] h-[120px]">
                    <img ref="img" class="w-full h-full" alt="cover image">
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