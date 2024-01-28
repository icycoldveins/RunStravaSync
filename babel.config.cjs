// babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // If you're using React
    // Include '@babel/preset-typescript' if you're using TypeScript
  ],
};
