import { createEffect, createRoot } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

export type PairItem = {
  headerKey: string;
  headerValue: string;
  active: boolean;
};

export type StoreAttrs = {
  version: "v1";
  globalActive: boolean;
  pairs: PairItem[];
};

function createGlobalStore() {
  const [store, setStore] = createStore<StoreAttrs>({
    version: "v1",
    globalActive: false,
    pairs: [{ headerKey: "", headerValue: "", active: true }],
  });

  chrome.storage.sync.get().then((storeInitialValue: any) => {
    // Get store initial value
    if (storeInitialValue.version === Store.data.version) {
      setStore(
        reconcile(storeInitialValue, {
          merge: true,
        })
      );
    }
  });

  // Subscribe store and sync data to storage
  createEffect(() => {
    chrome.storage.sync.set(store);
  });

  return {
    data: store,
    set: setStore,
  };
}

export const Store = createRoot(createGlobalStore);
