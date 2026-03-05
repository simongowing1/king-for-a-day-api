export const viewerHtml = (fetchUrl: string) => /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>King for a Day API</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F1EBE5;
      color: #0a0a0a;
      font-family: 'Courier Prime', Courier, monospace;
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
      <span>{{ artwork.title }}</span>
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
            const res = await fetch('${fetchUrl}')
            if (!res.ok) throw new Error(res.status === 404 ? 'Artwork not found' : 'Failed to fetch artwork')
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
