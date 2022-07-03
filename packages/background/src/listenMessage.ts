import { MessageSchemaType, RuleSchema } from "shared/schemas";
import { GLOBAL_ACTIVE_KEY, RULE_DATA_STORAGE_KEY } from "./const";
import { updateRules } from "./updateRules";
import { z } from "zod";
import pDebounce from "p-debounce";
import { LogsTempStorage } from "./listenMatchedRule";

const setRuleDebounce = pDebounce(updateRules, 300);

const handlers: Record<
  string,
  (body: any, sender: chrome.runtime.MessageSender) => Promise<any>
> = {
  // ----------------------------------------------------------------
  async getRuleData() {
    const data = await chrome.storage.local.get(RULE_DATA_STORAGE_KEY);
    return data[RULE_DATA_STORAGE_KEY] || [];
  },

  // ----------------------------------------------------------------
  async setRuleData(body) {
    const rules = z.array(RuleSchema).parse(body);

    // validate and save first
    await setRuleDebounce(rules, true);
    await chrome.storage.local.set({
      [RULE_DATA_STORAGE_KEY]: rules,
    });

    // if global active, update rule
    const data = await chrome.storage.local.get(GLOBAL_ACTIVE_KEY);
    if (data[GLOBAL_ACTIVE_KEY]) {
      await setRuleDebounce(rules);
    }

    return rules;
  },

  // ----------------------------------------------------------------
  async getGlobalActive() {
    const data = await chrome.storage.local.get(GLOBAL_ACTIVE_KEY);
    return Boolean(data[GLOBAL_ACTIVE_KEY]);
  },

  // ----------------------------------------------------------------
  async setGlobalActive(body) {
    const isActive = Boolean(body);

    if (isActive) {
      const data = await chrome.storage.local.get(RULE_DATA_STORAGE_KEY);
      await updateRules(data[RULE_DATA_STORAGE_KEY]);
    } else {
      await updateRules([]);
    }
    await chrome.storage.local.set({
      [GLOBAL_ACTIVE_KEY]: isActive,
    });
    chrome.action.setIcon({
      path: `../icons/${isActive ? "icon.png" : "icon_inactive.png"}`,
    });
  },

  //  --------------------------------------------------------------
  async getLogs(body) {
    return LogsTempStorage[body] || [];
  },
};

export function listenMessage() {
  chrome.runtime.onMessage.addListener(
    async (message: MessageSchemaType, sender) => {
      if (message.action !== "request") return;

      const response = (body?: any, success = true) =>
        chrome.runtime.sendMessage<MessageSchemaType>({
          action: "response",
          requestId: message.requestId,
          success,
          body,
        });

      try {
        const result = await handlers[message.key](message.body, sender);
        await response(result);
      } catch (error: any) {
        response(error.message || String(error), false);
      }
    }
  );
}
