import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga TODAS las variables de .env (sin prefijo VITE_), solo para uso en el servidor de dev
  const env = loadEnv(mode, '.', '')

  return {
    resolve: {
      alias: { '@': '/src' },
    },
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // El navegador llama a /api/countries (mismo origen) -> sin CORS y la key no sale al cliente
        '/api/countries': {
          target: 'https://api.restcountries.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/countries/, '/countries/v5'),
          headers: { Authorization: `Bearer ${env.REST_COUNTRIES_API_KEY}` },
          // la API bloquea orígenes de navegador no autorizados: quitamos Origin para que cuente como server-to-server
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'))
          },
        },
      },
    },
  }
})
