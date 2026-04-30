import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import fs from 'node:fs/promises'

const patchDogeOSDogecoinTabKey = (code) => code.replace(
  'dogecoin: { tabKey: "doge", chainKey: "dogecoin" }',
  'dogecoin: { tabKey: "dogecoin", chainKey: "dogecoin" }',
)

const dogeOSDogecoinTabKeyFix = () => ({
  name: 'dogeos-dogecoin-tab-key-fix',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('@dogeos/dogeos-sdk/dist/')) {
      return null
    }

    const fixedCode = patchDogeOSDogecoinTabKey(code)

    return fixedCode === code ? null : fixedCode
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dogeOSDogecoinTabKeyFix(),
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
                contents: patchDogeOSDogecoinTabKey(await fs.readFile(path, 'utf8')),
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
