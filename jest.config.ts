import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  maxWorkers: 1,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
