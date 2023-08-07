<template>
  <UCard>
    <div>
      <UBadge
        :color="props.color"
        size="lg"
        :ui="{
          rounded: 'rounded-full',
        }"
      >
        <slot name="icon" />
      </UBadge>
    </div>
    <div class="my-8">
      <slot name="title" />
    </div>
    <div class="dark:text-gray-400 text-gray-500">
      <slot name="content" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
  interface Props {
    color: string;
  }

  const props = defineProps<Props>();
</script>
