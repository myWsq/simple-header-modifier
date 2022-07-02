import { catchError } from "./catchError";
import { GLOBAL_ACTIVE_KEY, RULE_DATA_STORAGE_KEY } from "./const";
import { listenMessage } from "./listenMessage";

self.addEventListener("error", (error) => {
  catchError(error);
});

self.addEventListener("unhandledrejection", (error) => {
  catchError(error.reason);
});

// default values
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    [RULE_DATA_STORAGE_KEY]: [],
    [GLOBAL_ACTIVE_KEY]: true,
  });
});

listenMessage();
