/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testMatch: ["**/__test__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
};