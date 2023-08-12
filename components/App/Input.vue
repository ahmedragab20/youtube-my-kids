<template>
  <input
    :value="props.modelValue"
    class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-50 focus:outline-none focus:ring-0"
    @input="onInput"
  />
</template>

<script setup lang="ts">
  interface Props {
    modelValue: string | number;
    [key: string]: any;
  }
  const props = defineProps<Partial<Props>>();

  const emit = defineEmits(['update:modelValue']);

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>
