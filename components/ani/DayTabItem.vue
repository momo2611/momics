<script lang="ts" setup>
const props = defineProps<{
    name: string;
    active?: boolean;
}>()
const self = ref<HTMLElement>()

onMounted(() => {
    if (props.active) {
        self.value?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
})
</script>
<template>
    <li ref="self">
        <NuxtLink :to="`?day=` + name" class="font-bold px-3 py-2 rounded-lg inline-block z-10 relative" ref="self">
            {{ name }}
        </NuxtLink>
    </li>
</template>