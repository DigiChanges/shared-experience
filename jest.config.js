/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "lib/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/node_modules/",
      "!lib/**/*.d.ts",
      "!lib/**/*.d.ts.map",
      "!lib/**/I*.{js,ts}"
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.eslintrc.json",
  ],
  coverageProvider: "babel",
  coverageReporters: [
    "json",
    "text",
    "html"
  ],
  coverageThreshold: {
    global: {
      statements: '75',
      branches: '50',
      functions: '50',
      lines: '75',
    }
  },
  errorOnDeprecated: false,
  maxWorkers: "70%",
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "node"
  ],
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./lib/src/Tests/__mocks__/mocks.js",
      "\\.(css|less)$": "./dist/src/Tests/__mocks__/mocks.js"
  },
  roots: [
    "./lib"
  ],
  testEnvironment: "node",
  testRegex: '((\\.|/)(spec))\\.js?$',
  verbose: true,
  testTimeout: 16000,
  watchPathIgnorePatterns: ['globalConfig'],
};
