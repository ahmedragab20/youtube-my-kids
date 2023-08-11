<template>
  <div>
    <slot />
  </div>
  <UContainer class="mt-auto flex-col flex items-center pt-6 pb-28 gap-3">
    <div class="text-gray-500">
      Made with <i class="i-heroicons-heart text-red-500 m-auto translate-y-1"></i> by Ragab
    </div>
    <ThemeToggler />
  </UContainer>
</template>

<script setup lang="ts">
  //
</script>
