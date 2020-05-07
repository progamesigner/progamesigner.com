module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './hugo_stats.json'
      ],
      defaultExtractor: content => {
        const {
          htmlElements: {
            classes,
            ids,
            tags
          }
        } = JSON.parse(content)
        return tags.concat(classes, ids)
      },
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
