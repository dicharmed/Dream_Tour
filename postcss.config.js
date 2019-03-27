module.exports = ({ file, options, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
      'postcss-import': { root: file.dirname },
      'postcss-preset-env': {
           options: options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
           browsers: ['> 1%', 'last 2 versions', 'ie >= 11']
      },     
      'cssnano': env === 'production' ? options.cssnano : false  
    }
  })