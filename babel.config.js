module.exports = {
  presets: [
    '@react-native/babel-preset',
    ['@babel/preset-env', { 
      targets: { browsers: ['last 2 versions'] }, 
      modules: 'auto' 
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  env: {
    web: {
      presets: [
        '@react-native/babel-preset',
        ['@babel/preset-env', { 
          targets: { browsers: ['last 2 versions'] }, 
          modules: 'commonjs' 
        }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
  },
};