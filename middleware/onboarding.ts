export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCurrentUser();

  if (!!user.value?.displayName) {
    return navigateTo('/dashboard');
  }
  if (!user.value?.uid) {
    return navigateTo('/auth/signin');
  }

  return true;
});
