import pDebounce from "p-debounce";

type PairItem = {
  headerKey: string;
  headerValue: string;
  active: boolean;
};

async function syncRule() {
  const data = await chrome.storage.sync.get();

  const pairs: PairItem[] = (data.pairs && Object.values(data.pairs)) || [];

  // setIcon
  chrome.action.setIcon({
    path: `../icons/icon_${
      data.globalActive ? "active" : "inactive"
    }_128x128.png`,
  });

  // get valid rules
  const validPairs: PairItem[] = [];
  const existsKeySet = new Set<string>();
  for (const item of pairs) {
    if (item.headerKey && item.active && !existsKeySet.has(item.headerKey)) {
      validPairs.push(item);
      existsKeySet.add(item.headerKey);
    }
  }

  // remove current rules
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map((item) => item.id),
  });

  // set new rules
  if (validPairs.length && data.globalActive) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: validPairs.map((item) => ({
              header: item.headerKey,
              value: item.headerValue,
              operation: chrome.declarativeNetRequest.HeaderOperation.SET,
            })),
          },
          condition: {
            resourceTypes: [
              chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
              chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
              chrome.declarativeNetRequest.ResourceType.STYLESHEET,
              chrome.declarativeNetRequest.ResourceType.SCRIPT,
              chrome.declarativeNetRequest.ResourceType.IMAGE,
              chrome.declarativeNetRequest.ResourceType.FONT,
              chrome.declarativeNetRequest.ResourceType.OBJECT,
              chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
              chrome.declarativeNetRequest.ResourceType.PING,
              chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
              chrome.declarativeNetRequest.ResourceType.MEDIA,
              chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
              chrome.declarativeNetRequest.ResourceType.OTHER,
            ],
          },
        },
      ],
    });
  }
}

const syncRuleDebounce = pDebounce(syncRule, 100);

async function main() {
  chrome.storage.onChanged.addListener(async () => {
    await syncRuleDebounce();
  });
  await syncRuleDebounce();
}

main();