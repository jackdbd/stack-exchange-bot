const config = {
  collectCoverage: true,
  globals: {
    // enable diagnostics for test files only
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
      },
    },
  },
  transform: {
    '.+\\.ts?': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  modulePathIgnorePatterns: ['/build/', '/node_modules/'],
  verbose: true,
};

module.exports = config;
