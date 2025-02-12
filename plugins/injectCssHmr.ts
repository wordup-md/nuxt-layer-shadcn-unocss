// plugins/hmrListener.plugin.js

export default defineNuxtPlugin(() => { // nuxtApp
  // Check if HMR is enabled and available
  // if (import.meta.hot) {
  //   // Listen for specific module updates
  //   import.meta.hot.on('vite:beforeUpdate', (payload) => {
  //     console.log('Vite before update:', payload);
  //   });

  //   import.meta.hot.on('vite:afterUpdate', (payload) => {
  //     console.log('Vite after update:', payload);
  //   });

  //   import.meta.hot.on('vite:error', (payload) => {
  //     console.error('Vite error during update:', payload);
  //   });

  //   // Listen for any HMR event
  //   import.meta.hot.on('*', (event, payload) => {
  //     console.log(`Received HMR event: ${event}`, payload);
  //   });
  // } else {
  //   console.warn('HMR is not enabled or not available.');
  // }
})
