<template>
  <NuxtLayout>
    <div micro-target="micro-1"></div>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
</template>
<script lang="ts" setup>
  import microApp from '@/public/service/script';

  const { name: appName } = useMyApp();

  useHead({
    title: appName,
  });

  interface options {
    google: boolean;
  }

  onMounted(async () => {
    await microApp<options>("[micro-target='micro-1']", {
      google: true,
    });
  });
</script>
