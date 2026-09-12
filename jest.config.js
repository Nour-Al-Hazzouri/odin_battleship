// jest.config.js
export default {
  // Configures Jest to use a browser environment (window, document, etc.)
  testEnvironment: "jsdom",

  // Uses babel-jest to compile your JavaScript source files
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Routes non-JS imports to your mock files
  moduleNameMapper: {
    // Matches your Webpack CSS rules
    "\\.(css|less|sass|scss)$": "<rootDir>/__jest__/styleMock.js",

    // Matches your Webpack asset/resource and html-loader rules
    "\\.(html|png|svg|jpg|jpeg|gif|webp)$": "<rootDir>/__jest__/fileMock.js",
  },
};
