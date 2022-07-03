module.exports = {
  roots: ["<rootDir>/src/ts"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/.jest/set-env-vars.js"],
  setupFilesAfterEnv: ["<rootDir>/.jest/jest-setup.js"],
};
