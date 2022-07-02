import { z } from "zod";

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

export const RuleSchema = z.object({
  active: z.boolean().default(true),
  name: z.string().optional(),
  headers: z
    .array(
      z.object({
        active: z.boolean(),
        key: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  matchConfig: z.object({
    matchMode: z.enum(["urlFilter", "urlRegexp"]).default("urlFilter"),
    urlFilter: z.string().default(""),
    urlRegexp: z.string().default(""),
    domains: z.array(z.string()).default([]),
    methods: z.array(z.string()).default(AVAILABLE_METHODS),
    resourceTypes: z.array(z.string()).default(AVAILABLE_RESOURCE_TYPES),
  }),
});
