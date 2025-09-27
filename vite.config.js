import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
      includeAssets: ['./android','./ios','./windows11'],
      manifest: {
        name: 'Horoscopo React',
        short_name: 'Horoscopo',
        description: 'App de horóscopo en React con Vite y PWA',
        theme_color: '#212529',
        display_override: ["fullscreen", "minimal-ui", "window-controls-overlay"],
        display: "standalone",
        icons: [
          { "src": "/windows11/SmallTile.scale-100.png", "sizes": "71x71" },
          { "src": "/windows11/SmallTile.scale-125.png", "sizes": "89x89" },
          { "src": "/windows11/SmallTile.scale-150.png", "sizes": "107x107" },
          { "src": "/windows11/SmallTile.scale-200.png", "sizes": "142x142" },
          { "src": "/windows11/SmallTile.scale-400.png", "sizes": "284x284" },
          { "src": "/windows11/Square150x150Logo.scale-100.png", "sizes": "150x150" },
          { "src": "/windows11/Square150x150Logo.scale-125.png", "sizes": "188x188" },
          { "src": "/windows11/Square150x150Logo.scale-150.png", "sizes": "225x225" },
          { "src": "/windows11/Square150x150Logo.scale-200.png", "sizes": "300x300" },
          { "src": "/windows11/Square150x150Logo.scale-400.png", "sizes": "600x600" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png", "sizes": "16x16" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png", "sizes": "20x20" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png", "sizes": "24x24" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png", "sizes": "256x256" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png", "sizes": "30x30" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png", "sizes": "32x32" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png", "sizes": "36x36" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png", "sizes": "40x40" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png", "sizes": "44x44" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png", "sizes": "48x48" },
          { "src": "/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png", "sizes": "60x60" },
          { "src": "/windows11/Square44x44Logo.targetsize-64.png", "sizes": "64x64" },
          { "src": "/windows11/Square44x44Logo.targetsize-72.png", "sizes": "72x72" },
          { "src": "/windows11/Square44x44Logo.targetsize-80.png", "sizes": "80x80" },
          { "src": "/windows11/Square44x44Logo.targetsize-96.png", "sizes": "96x96" },
          { "src": "/windows11/Square150x150Logo.scale-100.png", "sizes": "150x150" },
          { "src": "/windows11/Square150x150Logo.scale-200.png", "sizes": "300x300" },
          { "src": "/windows11/Wide310x150Logo.scale-100.png", "sizes": "310x150" },
          { "src": "/android/android-launchericon-192-192.png", "sizes": "192x192", "type": "image/png" },
          { "src": "/android/android-launchericon-512-512.png", "sizes": "512x512", "type": "image/png" }
        ]
      }
    })
  ],
})
