<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    videoId: string;
  }

  const { videoId } = defineProps<Props>();

  const apiKey = 'AIzaSyC0jwqcbPNSljJG5foK0hAV_GyeKmYaJdo';
  const { data, pending, error, refresh } = await useFetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}`
  );

  console.log(data);
</script>
