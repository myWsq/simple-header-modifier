import { catchError } from "./catchError";
import { GLOBAL_ACTIVE_KEY, RULE_DATA_STORAGE_KEY } from "./const";
import { listenMatchedRule } from "./listenMatchedRule";
import { listenMessage } from "./listenMessage";

self.addEventListener("error", (error) => {
  catchError(error);
});

self.addEventListener("unhandledrejection", (error) => {
  catchError(error.reason);
});

chrome.runtime.onInstalled.addListener(() => {
  // default values
  chrome.storage.local.set({
    [RULE_DATA_STORAGE_KEY]: [],
    [GLOBAL_ACTIVE_KEY]: true,
  });

  // display badge text
  chrome.declarativeNetRequest.setExtensionActionOptions({
    displayActionCountAsBadgeText: true,
  });
});

listenMessage();
listenMatchedRule();
