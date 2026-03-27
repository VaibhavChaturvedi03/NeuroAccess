module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    },
    'postcss-nested': {},
    'postcss-custom-media': {},
    'postcss-custom-properties': {},
    'postcss-flexbugs-fixes': {},
    'postcss-normalize': {},
    'autoprefixer': {
      flexbox: 'no-2009'
    },
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    } : false
  }
}; 