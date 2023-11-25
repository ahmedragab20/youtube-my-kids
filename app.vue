<template>
  <!-- <iframe src="/micro.html" frameborder="0"></iframe> -->
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

  // onMounted(async () => {
  //   console.log(
  //     microApp({
  //       color: 'blue',
  //       htmlFilePath: '@/public/service/micro-1.html',
  //     })
  //   );
  // });
</script>
