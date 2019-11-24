const config = {
  collectCoverage: true,
  globals: {
    // enable diagnostics for test files only
    'ts-jest': {
      diagnostics: true,
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  modulePathIgnorePatterns: ['/build/', '/node_modules/'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '.+\\.ts?': 'ts-jest',
  },
  verbose: true,
};

module.exports = config;
