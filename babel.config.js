module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@forms': './src/forms',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@images': './assets/images',
          '@fonts': './assets/fonts',
          '@functions': './src/functions',
          '@animations': './assets/animations',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
