<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
</template>
<script lang="ts" setup>
  const { name: appName } = useMyApp();

  useHead({
    title: appName,
  });
</script>
