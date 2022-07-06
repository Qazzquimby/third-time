import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['shepherd-btn', 'bg-transparent text-white hover:bg-slate-500 py-2 px-4 border border-slate-300 hover:border-transparent rounded w-full'],
    ['glass', 'bg-gradient-to-b from-white:25 to bg-white:10 border-rd-10 border-solid border-1px border-white:30'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
