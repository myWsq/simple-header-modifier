export const AVAILABLE_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "HEAD",
  "PATCH",
  "OPTIONS",
  "CONNECT",
];

export const AVAILABLE_RESOURCE_TYPES = [
  "main_frame",
  "sub_frame",
  "stylesheet",
  "script",
  "image",
  "font",
  "object",
  "xmlhttprequest",
  "ping",
  "csp_report",
  "media",
  "websocket",
  "other",
];

const STORAGE_VERSION = "v2";

export const RULE_LIST_STORAGE_KEY = STORAGE_VERSION + "/" + "ruleList";
export const GLOBAL_ACTIVE_STORAGE_KEY = STORAGE_VERSION + "/" + "globalActive";
