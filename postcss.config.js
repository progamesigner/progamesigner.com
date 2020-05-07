module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './**/*.html'
      ],
      fontFace: true,
      keyframes: true
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          autoprefixer: {},
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}
