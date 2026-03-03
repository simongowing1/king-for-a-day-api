export const viewerRandomHtml = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>King for a Day</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F1EBE5;
      color: #0a0a0a;
      font-family: Georgia, 'Times New Roman', serif;
      padding: 2rem;
    }
    #app {
      text-align: center;
      max-width: 640px;
    }
    .artwork {
      font-size: clamp(1.25rem, 4vw, 2rem);
      line-height: 1.4;
      letter-spacing: 0.01em;
      
    }
    .id {
      font-size: 0.85em;
      margin-right: 4ch;
    }
    .loading {
      opacity: 0.35;
      font-size: 1rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .error {
      opacity: 0.35;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div id="app">
    <p v-if="loading" class="loading">—</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else class="artwork">
      <span class="id">{{ artwork.id }}</span>
      <span >{{ artwork.title }}</span>
    </p>
  </div>
  <script>
    const { createApp, ref, onMounted } = Vue
    createApp({
      setup() {
        const artwork = ref(null)
        const loading = ref(true)
        const error = ref(null)
        onMounted(async () => {
          try {
            const res = await fetch('/artwork/random')
            if (!res.ok) throw new Error('Failed to fetch artwork')
            artwork.value = await res.json()
          } catch (e) {
            error.value = e.message
          } finally {
            loading.value = false
          }
        })
        return { artwork, loading, error }
      }
    }).mount('#app')
  </script>
</body>
</html>`
