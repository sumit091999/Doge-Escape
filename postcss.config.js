import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const tailwindPlugin = tailwindcss().plugins[0]

const conditionalTailwind = {
  postcssPlugin: 'conditional-tailwind',
  async Once(root, { result }) {
    const file = root.source?.input.file || ''

    if (file.includes('node_modules/@dogeos/dogeos-sdk')) {
      return
    }

    await tailwindPlugin(root, result)
  },
}

export default {
  plugins: [
    conditionalTailwind,
    autoprefixer(),
  ],
}
