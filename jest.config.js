module.exports = {
  roots: ['src'],
  testURL: 'http://localhost/',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  modulePathIgnorePatterns: ['.git'],
  moduleDirectories: ['node_modules', 'src'],
};
