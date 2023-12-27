/** @type {import('ts-jest').JestConfigWithTsJest} */

{
  compilerOptions = {
    types: ['reflect-metadata', 'jest']
  }
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
};