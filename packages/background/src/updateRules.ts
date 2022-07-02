import { RuleSchemaType } from "shared/schemas";

export async function updateRules(rules: RuleSchemaType[], dryRun = false) {
  const currentRules = await chrome.declarativeNetRequest.getDynamicRules();

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: currentRules.map((item) => item.id), // remove current rules
    addRules: rules // set new rules
      .filter(
        ({ active, headers }) =>
          active &&
          headers.filter((header) => header.active && header.key).length > 0
      )
      .map((rule, i) => ({
        id: i + 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders:
            rule.headers
              .filter(({ active, key }) => active && key)
              .map(({ key, value }) => ({
                header: key,
                value,
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
              })) || undefined,
        },
        condition: {
          resourceTypes: rule.matchConfig.resourceTypes as any,
          requestMethods: rule.matchConfig.methods as any,
          regexFilter:
            rule.matchConfig.matchMode === "urlRegexp"
              ? rule.matchConfig.urlRegexp || undefined
              : undefined,
          urlFilter:
            rule.matchConfig.matchMode === "urlFilter"
              ? rule.matchConfig.urlFilter || undefined
              : undefined,
        },
      })),
  });

  if (dryRun) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((_, i) => i + 1), // remove new rules
      addRules: currentRules,
    });
  }
}
