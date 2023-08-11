<template>
  <client-only>
    <UTooltip
      text="Toggle App Theme"
      :shortcuts="[metaSymbol, '.']"
      :open-delay="100"
      :close-delay="100"
    >
      <UToggle
        v-model="isDark"
        on-icon="i-heroicons-moon"
        off-icon="i-heroicons-sun"
        color="gray"
      />
    </UTooltip>
  </client-only>
</template>

<script setup lang="ts">
  const { metaSymbol } = useShortcuts();
  const colorMode = useColorMode();

  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });

  defineShortcuts({
    'meta_.': {
      usingInput: true,
      handler: () => {
        isDark.value = !isDark.value;
      },
    },
  });
</script>
