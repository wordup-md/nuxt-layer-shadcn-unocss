export default defineNuxtRouteMiddleware((to, from) => {
  const { client } = useUnpress()

  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    if (!client.value) {
      return navigateTo({
        path: '/admin/login',
        query: { redirectTo: from.fullPath },
      })
    }
  }
})
