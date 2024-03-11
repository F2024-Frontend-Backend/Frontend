// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Automatically unmount and cleanup DOM after each test is finished.
afterEach(() => {
  cleanup();
});
