<template>
  <div class="min-h-screen flex justify-between flex-col">
    <UContainer>
      <div
        class="flex mx-auto justify-center items-center flex-col sm:max-w-xl max-w-full p-5 my-10 sm:p-10 rounded-t-full dark:shadow-gray-900 hover:shadow-2xl hover:shadow-primary-500 hover:dark:shadow-primary-500 duration-300"
      >
        <!-- logo -->
        <div class="w-44 pointer-events-none select-none">
          <div class="my-10 w-44">
            <IconLogo class="text-primary-500 dark:text-primary-400" />
          </div>
        </div>
        <!-- content -->
        <div class="flex justify-center items-center flex-col">
          <h1
            class="text-center text-primary-500 dark:text-primary-400 text-4xl sm:text-6xl font-extrabold"
          >
            {{ appName }}
          </h1>
          <p class="text-center text-xs sm:text-sm mb-1 mt-4">
            Discover the ultimate solution for safeguarding your kids while they enjoy their
            favorite videos on Youtube.
          </p>
          <p class="text-center text-xs sm:text-sm">
            With Youtube My Kids, you can rest assured that your children will have a safe and
            enriching online experience.
          </p>
          <UBadge :ui="{ rounded: 'rounded-full' }" variant="soft" class="mt-5">
            stay away from the brainwashing 👀
          </UBadge>
        </div>
        <!-- buttons -->
        <ULink
          to="/auth/signup"
          class="text-primary-500 dark:text-primary-400 border-2 border-primary-500 dark:border-primary-400 p-1 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 dark:hover:text-white duration-300 rounded-full mt-10 px-2"
        >
          Get Started
        </ULink>
      </div>
    </UContainer>
    <section>
      <div class="py-8 px-4 mx-auto lg:py-16 container">
        <div class="flex flex-wrap gap-4 justify-between">
          <InfoCard
            class="w-full duration-300 hover:shadow-2xl hover:shadow-green-400 dark:hover:shadow-green-500"
            color="green"
          >
            <template #icon>
              <UIcon name="i-heroicons-lock-closed" class="m-auto text-lg sm:text-2xl"></UIcon>
              <span class="mx-2 text-lg sm:text-2xl"> Security </span>
            </template>
            <template #title>
              <h3 class="text-3xl sm:text-4xl font-extrabold dark:text-gray-300 text-gray-700">
                Don't hand your kids over to someone else's standards.
              </h3>
            </template>
            <template #content>
              <p>
                Youtube My Kids is a free and open source project that allows you to create a safe
                environment for your kids to enjoy their favorite videos on Youtube.
              </p>
              <p>
                Meaning, you can choose what videos your kids can watch, and what videos they can't.
              </p>
              <p>we can't force you to watch something that you didn't choose.</p>
            </template>
          </InfoCard>
          <InfoCard
            class="w-full sm:w-[calc(50%-10px)] duration-500 hover:shadow-2xl hover:shadow-indigo-400 dark:hover:shadow-indigo-500"
            color="indigo"
          >
            <template #icon>
              <UIcon name="i-heroicons-eye-slash" class="m-auto text-lg sm:text-2xl"></UIcon>
              <span class="mx-2 text-lg sm:text-2xl"> Monitoring </span>
            </template>
            <template #title>
              <h3 class="text-3xl sm:text-4xl font-extrabold dark:text-gray-300 text-gray-700">
                Your eyes are on your kids, even when you're not.
              </h3>
            </template>
            <template #content>
              <p>
                You can cherry-pick the videos you want your kids to watch, and Youtube My Kids will
                take care of the rest.
              </p>
              <p>
                So that means, there is no need to worry about your kids stumbling upon
                inappropriate or brainwashing videos.
              </p>
            </template>
          </InfoCard>
          <InfoCard
            class="w-full sm:w-[calc(50%-10px)] duration-500 hover:shadow-2xl hover:shadow-orange-400 dark:hover:shadow-orange-500"
            color="orange"
          >
            <template #icon>
              <UIcon name="i-heroicons-lock-closed" class="m-auto text-lg sm:text-2xl"></UIcon>
              <span class="mx-2 text-lg sm:text-2xl"> Control </span>
            </template>
            <template #title>
              <h3 class="text-3xl sm:text-4xl font-extrabold dark:text-gray-300 text-gray-700">
                No more Stealing your phone to watch Youtube videos.
              </h3>
            </template>
            <template #content>
              <p>
                You can set a time limit and time frame for your kids to use the app, and once the
                time is up, the app will be locked.
              </p>
              <p>
                that helps you to control the time your kids spend on Youtube or on phone in
                general.
              </p>
            </template>
          </InfoCard>
        </div>
      </div>
    </section>
    <UContainer class="my-10">
      <div>
        <h3 class="text-3xl sm:text-6xl font-extrabold text-center">
          <p>Time to get started?!</p>
          <p>
            <span class="text-primary-500 dark:text-primary-400">it's free</span> and always will
            be.
          </p>
        </h3>

        <div class="my-5 flex justify-center">
          <ULink
            to="/auth/signup"
            class="border-2 border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 dark:hover:text-white duration-300 rounded-full p-2"
          >
            <div class="p-2">
              <UIcon name="i-heroicons-sparkles text-xl sm:text-3xl" class="mr-2"></UIcon>
              <strong class="text-xl sm:text-3xl">Let's get started</strong>
            </div>
          </ULink>
        </div>
      </div>
    </UContainer>
  </div>
</template>
<script lang="ts" setup>
  const { name: appName } = useMyApp();
</script>
