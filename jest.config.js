const { resolve } = require('node:path');
const rootDir = resolve(__dirname);

module.exports = {
  preset: 'ts-jest',
  rootDir,
  bail: true,
  clearMocks: true,
  maxWorkers: 1,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: [
    'src/modules/**/useCases/**/*UseCase.ts',
    'src/modules/**/useCases/**/*Controller.ts',
  ],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@errors/(.*)': '<rootDir>/src/shared/errors/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  testMatch: ['<rootDir>/src/modules/**/*.spec.ts'],
};
