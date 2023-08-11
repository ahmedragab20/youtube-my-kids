<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
  const { name: appName } = useMyApp();

  useHead({
    title: appName,
  });
</script>
