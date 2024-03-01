// jest.config.cjs
module.exports = {
  globalSetup: '<rootDir>/jest.global-setup.js',
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      setupFilesAfterEnv: ["<rootDir>/backend/test/server.test.js"],
      testMatch: ["<rootDir>/backend/test/server.test.js"],
    },
    {
      displayName: "frontend",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/src/Homepage.test.js"],
      testMatch: ["<rootDir>/src/Homepage.test.js"],
    },
  ],
};
