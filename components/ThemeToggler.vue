<template>
  <client-only>
    <UToggle v-model="isDark" on-icon="i-heroicons-moon" off-icon="i-heroicons-sun" color="gray" />
  </client-only>
</template>

<script setup lang="ts">
  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });
</script>
