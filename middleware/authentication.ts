export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCurrentUser();

  if (!user.value) {
    return navigateTo('/auth/signin');
  }
  // TODO.... check the auth-land case later
});
