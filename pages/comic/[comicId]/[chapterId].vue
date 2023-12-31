<script lang="ts" setup>
import { ComicDetail } from '@/types';
import { historyAddComic } from '@/utils/localDb';

const currentPage = ref<number>(1);
const inputRangeVal = ref<number>(1);

const firstRender = ref<boolean>(true);

const openEpisode = ref<boolean>(false);
const showToolbar = ref<boolean>(true);
const isFetching = ref<boolean>(false);
const isEnd = ref<boolean>(false);
const isChangingEpisode = ref<boolean>(false);

const route = useRoute();
const { chapterId, comicId } = route.params;

const { images, chapters, comic_name, chapter_name } = await useFetchData(
    `/comics/${comicId}/chapters/${chapterId}`
);

if (images.length === 0 && comic_name === 'Thể loại') {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const handleChangeEpisode = (type: 'prev' | 'next') => {
    isChangingEpisode.value = true;
    const episodes = [...chapters].reverse();
    const chapterIdx = episodes.findIndex(
        (chapter: any) => chapter.id === Number(chapterId)
    );
    const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1);
    navigateTo(`/comic/${comicId}/${episodes[nextChapterIdx].id}`);
};

const handleShowToolbar = (e: Event) => {
    if (e.target !== e.currentTarget) return;
    showToolbar.value = !showToolbar.value;
    openEpisode.value = false;
};

const onOpenEpisodes = () => {
    openEpisode.value = !openEpisode.value;
    if (openEpisode.value) {
        document.getElementById(chapterId as string)?.scrollIntoView();
    }
};

const handleDownload = async () => {
    try {
        const href = `/download?comicId=${comicId}&chapterId=${chapterId}`;
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
    } catch (err) {
        console.log(err);
    }
};

watch(inputRangeVal, (newValue) => {
    const el = document.getElementById(newValue.toString());
    el?.scrollIntoView();
});

const getElementsPos = () => {
    const elements = document.querySelectorAll('.image-source');
    const foundEle = Array.from(elements).find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top > 0;
    });
    if (foundEle) {
        currentPage.value = Number(foundEle.getAttribute('id')) - 1;
        return;
    }
    if (firstRender.value) {
        currentPage.value = 1;
        firstRender.value = false;
        return;
    }
    currentPage.value = elements.length;
};

onMounted(async () => {
    document.addEventListener('scroll', getElementsPos);
    const comic: ComicDetail = await useFetchData(`/comics/${comicId}`);
    const { id, status, title, thumbnail } = comic;
    historyAddComic({
        id,
        status,
        title,
        thumbnail,
        reading_at: new Date().getTime(),
        last_reading: chapter_name,
        chapter_id: Number(chapterId),
    });
});
onBeforeUnmount(() => document.removeEventListener('scroll', getElementsPos));

useSeoMeta(
    meta({
        title: `${comic_name} - ${chapter_name} | Momics`,
    })
);
useServerSeoMeta(
    meta({
        title: `${comic_name} - ${chapter_name} | Momics`,
    })
);
</script>

<template>
    <main class="bg-zinc-900 min-h-screen">
        <div class="flex flex-col max-w-2xl mx-auto">
            <span v-if="isChangingEpisode" v-for="(_, idx) in new Array(5)" :key="idx"
                class="aspect-[2/3] bg-zinc-700 animate-pulse">
            </span>
            <img v-else v-for="image in images" :key="image.src" :src="image.src" :alt="`Page ${image.page}`" loading="lazy"
                :id="image.page" class="image-source w-full select-none" />
        </div>
        <div class="fixed inset-0" @click="handleShowToolbar">
            <div :class="`select-none top-0 inset-x-0 bg-[rgba(0,0,0,0.9)] text-center py-3 px-2 text-gray-300 font-semibold duration-200 ${showToolbar
                ? 'translate-y-0 opacity-1'
                : '-translate-y-full opacity-0'
                }`">
                <NuxtLink :to="`/comic/${comicId as string}`">
                    {{ comic_name }}
                </NuxtLink>
                <Icon name="icon-park-outline:right" size="16" class="mx-2 mb-0.5" />
                <span>{{ chapter_name }}</span>
            </div>
            <div :class="`select-none absolute flex items-center flex-col-reverse justify-center gap-3 lg:flex-row lg:gap-8 py-2 bottom-0 inset-x-0 bg-[rgba(0,0,0,0.75)] text-gray-400 text-sm font-semibold duration-300
           ${showToolbar
                    ? 'translate-y-0 opacity-1'
                    : 'translate-y-full opacity-0'
                }
        `">
                <div class="items-center gap-2 hidden lg:flex">
                    <span class="w-16" v-text="`${currentPage} / ${images.length}`" />
                    <input type="range" min="1" :max="images.length" v-model="currentPage" step="1"
                        @input="(e: any) => inputRangeVal = parseInt(e.target.value)" />
                </div>
                <div class="flex items-center gap-3">
                    <button :class="`px-3 py-1 rounded-full ${chapterId == chapters.at(-1).id
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-[#FAF2D4] text-[#D9A56F] '
                        }`" @click="handleChangeEpisode('prev')" :disabled="chapterId == chapters.at(-1).id">
                        Previous
                    </button>
                    <button :class="`px-3 py-1 rounded-full ${chapterId == chapters[0].id
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-[#FAF2D4] text-[#D9A56F] '
                        }`" @click="handleChangeEpisode('next')" :disabled="chapterId == chapters[0].id">
                        Next
                    </button>
                    <button class="px-3 py-1 bg-fuchsia-200 text-fuchsia-500 rounded-full relative" @click="onOpenEpisodes">
                        Episodes
                        <div :class="`z-10 absolute bg-zinc-900 w-60 py-3 rounded bottom-9 text-white right-full translate-x-1/3 sm:translate-x-1/2 sm:right-1/2 text-left duration-200 origin-bottom ${openEpisode ? 'scale-100' : 'scale-[0.001]'
                            }`">
                            <h5 class="text-lg px-4 pb-1">
                                All Episodes ({{ chapters.length }})
                            </h5>
                            <ul class="overflow-auto text-sm h-max max-h-72 font-normal">
                                <NuxtLink v-for="chapter in chapters" :to="`/comic/${comicId}/${chapter.id}`"
                                    :key="chapter.id" @click="isChangingEpisode = true" :class="`py-2 block truncate px-5 duration-100 hover:bg-zinc-950 ${chapter.id == chapterId ? 'text-[#D9A56F] font-bold' : ''
                                        }`" :id="chapter.id">
                                    {{ chapter.name }}
                                </NuxtLink>
                            </ul>
                        </div>
                    </button>
                </div>
                <span class="border-b rotate-90 w-4 border-gray-400 hidden lg:inline" />

                <button class="flex items-center gap-2" @click="handleDownload">
                    <Icon name="octicon:download-16" size="24" class="text-white" />
                    Download
                </button>
            </div>
        </div>
    </main>
</template>

<style scoped>
input[type='range'] {
    height: 20px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 280px;
    background-color: transparent;
}

input[type='range']:focus {
    outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animation: 0.2s;
    box-shadow: 0px 0px 0px #94a3b8;
    background: #94a3b8;
    border-radius: 0px;
    border: 0px solid #94a3b8;
}

input[type='range']::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #94a3b8;
    border: 0px solid #71717a;
    height: 14px;
    width: 6px;
    border-radius: 0px;
    background: #10b981;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
}

input[type='range']:focus::-webkit-slider-runnable-track {
    background: #94a3b8;
}

input[type='range']::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animation: 0.2s;
    box-shadow: 0px 0px 0px #94a3b8;
    background: #94a3b8;
    border-radius: 0px;
    border: 0px solid #94a3b8;
}

input[type='range']::-moz-range-thumb {
    box-shadow: 0px 0px 0px #94a3b8;
    border: 0px solid #71717a;
    height: 14px;
    width: 6px;
    border-radius: 0px;
    background: #10b981;
    cursor: pointer;
}

input[type='range']::-ms-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animation: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type='range']::-ms-fill-lower {
    background: #94a3b8;
    border: 0px solid #94a3b8;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #94a3b8;
}

input[type='range']::-ms-fill-upper {
    background: #94a3b8;
    border: 0px solid #94a3b8;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #94a3b8;
}

input[type='range']::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #94a3b8;
    border: 0px solid #71717a;
    height: 14px;
    width: 6px;
    border-radius: 0px;
    background: #10b981;
    cursor: pointer;
}

input[type='range']:focus::-ms-fill-lower {
    background: #94a3b8;
}

input[type='range']:focus::-ms-fill-upper {
    background: #94a3b8;
}
</style>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
}
</style>