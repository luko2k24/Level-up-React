// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    // Solo los tests como “entry”. El código src se importa desde los tests.
    files: ['tests/**/*.spec.js'],

    preprocessors: {
      'tests/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                // Fuerza presets + plugin de coverage aunque .babelrc falte
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['istanbul']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      resolve: { extensions: ['.js', '.jsx'] }
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: { statements: 60, branches: 50, functions: 60, lines: 60 }
      }
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
    client: { jasmine: { random: false } }
  })
}
