const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'layouts/partials'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
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
                      autoprefixer: {
                      },
                      discardComments: {
                        removeAll: true
                      }
                    }
                  ]
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    })
  ]
}
