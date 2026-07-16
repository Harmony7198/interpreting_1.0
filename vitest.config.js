import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",

    globals: true,

    include: [
      "tests/unit/**/*.test.js",
      "tests/business/**/*.test.js"
    ],

    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
        "lcov"
      ],

      reportsDirectory: "./coverage"
    }
  }
});