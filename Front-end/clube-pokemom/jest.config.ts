
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom/extend-expect'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.{js,jsx,ts,tsx}'],

};

  