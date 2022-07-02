import { z } from "zod";
import { AVAILABLE_METHODS, AVAILABLE_RESOURCE_TYPES } from "./const";

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

export type RuleSchemaType = z.infer<typeof RuleSchema>;

export const MessageSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("error"),
    payload: z.string(),
  }),
  z.object({
    action: z.literal("request"),
    requestId: z.string(),
    key: z.string(),
    body: z.any(),
  }),
  z.object({
    action: z.literal("response"),
    requestId: z.string(),
    success: z.boolean(),
    body: z.any(),
  }),
]);

export type MessageSchemaType = z.infer<typeof MessageSchema>;
