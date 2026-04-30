import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import fs from 'node:fs/promises'

const patchDogeOSDogecoinTabKey = (code) => code.replace(
  'dogecoin: { tabKey: "doge", chainKey: "dogecoin" }',
  'dogecoin: { tabKey: "dogecoin", chainKey: "dogecoin" }',
)

const patchDogeOSModalEmailHandoff = (code) => code.replace(
  'closeModalBeforeIframe: !0',
  'closeModalBeforeIframe: !1',
)

const patchDogeOSSDK = (code) => patchDogeOSModalEmailHandoff(patchDogeOSDogecoinTabKey(code))

const dogeOSSDKFixes = () => ({
  name: 'dogeos-sdk-fixes',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('@dogeos/dogeos-sdk/dist/')) {
      return null
    }

    const fixedCode = patchDogeOSSDK(code)

    return fixedCode === code ? null : fixedCode
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dogeOSSDKFixes(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'dogeos-dogecoin-tab-key-optimize-fix',
          setup(build) {
            build.onLoad(
              { filter: /@dogeos\/dogeos-sdk\/dist\/.*\.js$/ },
              async ({ path }) => ({
                contents: patchDogeOSSDK(await fs.readFile(path, 'utf8')),
                loader: 'js',
              }),
            )
          },
        },
      ],
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
