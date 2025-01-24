const { resolve } = require('node:path');
const rootDir = resolve(__dirname);

module.exports = {
  preset: 'ts-jest',
  rootDir,
  bail: true,
  maxWorkers: 1,
  coverageProvider: 'v8',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@errors/(.*)': '<rootDir>/src/shared/errors/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
  testMatch: ['<rootDir>/src/modules/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
