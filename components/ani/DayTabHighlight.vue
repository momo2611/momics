<script lang="ts" setup>
const props = defineProps<{
    element: HTMLElement | undefined;
}>();
const isLoading = checkLoading();
const ready = ref(false);

const style = computed(() => {

    const x = props.element?.offsetLeft;
    const w = props.element?.clientWidth;

    return `transform: translateX(${x! - 4}px); width: ${w}px`;
});

const unwatch = watch(isLoading, () => {
    if (isLoading.value) return;
    setTimeout(() => {
        ready.value = true;
    }, 50);
    unwatch();
});
</script>

<template>
    <div class="h-10 sm:bg-[#d4d0a3] rounded-lg absolute inset-0 m-1"
        :class="{ 'transition-[width,transform] duration-200': ready }" :style="style"></div>
</template>

<style scoped></style>