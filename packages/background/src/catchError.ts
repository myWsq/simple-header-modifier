import { MessageSchemaType } from "shared/schemas";

export async function catchError(error: any) {
  try {
    const message: MessageSchemaType = {
      action: "error",
      payload: error.message ?? String(error),
    };
    await chrome.runtime.sendMessage(message);
  } catch (error) {
    // ignore error
    console.error(error);
  }
}

export async function clearError() {
  try {
    const message: MessageSchemaType = {
      action: "error",
      payload: "",
    };
    await chrome.runtime.sendMessage(message);
  } catch (error) {
    // ignore error
    console.error(error);
  }
}
