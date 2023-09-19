<script lang="ts" setup>
const route = useRoute();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const day = useState<number>('day', () => new Date().getDay());

const list = ref<HTMLElement>();
const active = ref<HTMLElement>();

watchEffect(() => {
    const input = route.query.day as string;
    if (!input) return;

    const index = days.findIndex((d) => d.toLowerCase() == input.toLowerCase());
    if (index == -1) return;

    day.value = index;
});
onMounted(() => {
    watch(day, () => (active.value = list.value?.children[day.value] as HTMLElement), { immediate: true });
});
</script>

<template>
    <div class="flex overflow-x-auto px-5 no-scrollbar">
        <div class="mx-auto relative">
            <ul class="flex flex-wrap gap-1 p-1 bg-[#d9a56f]/70 rounded-xl" ref="list">
                <AniDayTabItem v-for="(d, i) in days" :key="i" :name="d" :active="i == day" />
            </ul>
            <AniDayTabHighlight :element="active" />
        </div>
    </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>