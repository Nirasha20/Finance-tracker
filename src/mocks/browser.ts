// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// This registers the mock service worker in the browser
export const worker = setupWorker(...handlers);