import { RuleSchemaType } from "shared/schemas";

export async function updateRules(rules: RuleSchemaType[], dryRun = false) {
  const rulesWithId: (RuleSchemaType & { id: number })[] = rules.map(
    (rule, i) => ({
      id: i + 1,
      ...rule,
    })
  );
  const currentRules = await chrome.declarativeNetRequest.getDynamicRules();

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: currentRules.map((item) => item.id), // remove current rules
    addRules: rulesWithId // set new rules
      .filter(
        ({ active, headers }) =>
          active &&
          headers.filter((header) => header.active && header.key).length > 0
      )
      .map((rule) => ({
        id: rule.id,
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
      removeRuleIds: rulesWithId.map((rule) => rule.id), // remove new rules
      addRules: currentRules,
    });
  }

  // debug
  if (import.meta.env.DEV) {
    console.dir(await chrome.declarativeNetRequest.getDynamicRules(), {
      depth: Infinity,
      colors: true,
    });
  }
}
