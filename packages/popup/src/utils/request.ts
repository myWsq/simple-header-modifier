import { MessageSchemaType } from "shared/schemas";
import { nanoid } from "nanoid";

export const request = async <Data = any>(key: string, body?: any) => {
  const requestId = nanoid();

  const promise = new Promise<Data>((resolve, reject) => {
    const listener = (message: MessageSchemaType) => {
      if (message.action !== "response" || message.requestId !== requestId) {
        return;
      }
      if (message.success) {
        resolve(message.body);
      } else {
        reject(message.body);
      }
      chrome.runtime.onMessage.removeListener(listener);
    };
    chrome.runtime.onMessage.addListener(listener);
  });

  await chrome.runtime.sendMessage<MessageSchemaType>({
    action: "request",
    requestId,
    key,
    body,
  });

  return promise;
};
