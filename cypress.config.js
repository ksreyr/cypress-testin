const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
        }
      });
    },
  },
});
