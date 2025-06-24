const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    }
  }
});