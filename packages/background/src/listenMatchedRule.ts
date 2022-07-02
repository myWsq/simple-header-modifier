import { LogSchemaType } from "shared/schemas";

export const LogsTempStorage: Record<number, LogSchemaType[]> = {};

// @see https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#event-onRuleMatchedDebug
export function listenMatchedRule() {
  chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener(
    ({ request, rule }) => {
      const logs = LogsTempStorage[request.tabId] || [];
      logs.unshift({
        method: request.method,
        url: request.url,
        ruleId: rule.ruleId,
      });
      LogsTempStorage[request.tabId] = logs;
    }
  );

  chrome.tabs.onUpdated.addListener((tabId, info) => {
    if (info.status === "loading") {
      delete LogsTempStorage[tabId];
    }
  });

  chrome.tabs.onRemoved.addListener((tabId) => {
    delete LogsTempStorage[tabId];
  });
}
