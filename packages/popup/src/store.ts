import produce from "immer";
import { atom, AtomEffect, selector } from "recoil";
import { z } from "zod";
import { RuleSchema } from "shared/schemas";

const STORAGE_VERSION = "v2";

export type Rule = z.infer<typeof RuleSchema>;

export type History = Record<
  string,
  {
    time: number;
    url: string;
  }[]
>;

const syncStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet, trigger }) => {
    const combinedKey = STORAGE_VERSION + "/" + key;

    /** 如果有一个持久化的值，在加载时设置它 */
    const loadPersisted = async () => {
      // const data = await chrome.storage.sync.get(combinedKey);
      // const savedValue = data[combinedKey];

      let savedValue: any = localStorage.getItem(combinedKey);

      if (savedValue) {
        savedValue = JSON.parse(savedValue);
      }

      if (savedValue != null) {
        setSelf(savedValue);
      }
    };

    loadPersisted();

    onSet((newValue, _, isReset) => {
      // chrome.storage.sync.set({
      //   [combinedKey]: newValue,
      // });
      isReset
        ? localStorage.removeItem(combinedKey)
        : localStorage.setItem(combinedKey, JSON.stringify(newValue));
    });

    // const storageChangedHandler: Parameters<
    //   typeof chrome.storage.onChanged.addListener
    // >[0] = (e, areaName) => {
    //   if (areaName === "sync") {
    //     const data = e[combinedKey]?.newValue;
    //     setSelf(data || null);
    //   }
    // };

    // chrome.storage.onChanged.addListener(storageChangedHandler);

    // return () => {
    //   chrome.storage.onChanged.removeListener(storageChangedHandler);
    // };
  };

export const globalActiveState = atom({
  key: "globalActive",
  default: false,
  effects: [syncStorageEffect("globalActive")],
});

export const ruleListState = atom<Rule[]>({
  key: "ruleList",
  default: [],
  effects: [syncStorageEffect("ruleList")],
});

const historyState = atom<History>({
  key: "history",
  default: {},
});

export const currentRuleIndexState = atom({
  key: "currentRuleIndex",
  default: -1,
});

export const currentRuleState = selector<Rule | undefined>({
  key: "currentRule",
  get({ get }) {
    const currentRuleIndex = get(currentRuleIndexState);
    const ruleList = get(ruleListState);
    return ruleList[currentRuleIndex];
  },
  set({ get, set }, newValue) {
    const currentRuleIndex = get(currentRuleIndexState);
    set(
      ruleListState,
      produce((d) => {
        d[currentRuleIndex] = RuleSchema.parse(newValue);
      })
    );
  },
});

// import { createEffect, createRoot } from "solid-js";
// import { createStore, reconcile } from "solid-js/store";

// export type PairItem = {
//   headerKey: string;
//   headerValue: string;
//   active: boolean;
// };

// export type StoreAttrs = {
//   version: "v1";
//   globalActive: boolean;
//   pairs: PairItem[];
// };

// function createGlobalStore() {
//   const [store, setStore] = createStore<StoreAttrs>({
//     version: "v1",
//     globalActive: false,
//     pairs: [{ headerKey: "", headerValue: "", active: true }],
//   });

//   chrome.storage.sync.get().then((storeInitialValue: any) => {
//     // Get store initial value
//     if (storeInitialValue.version === Store.data.version) {
//       setStore(
//         reconcile(storeInitialValue, {
//           merge: true,
//         })
//       );
//     }
//   });

//   // Subscribe store and sync data to storage
//   createEffect(() => {
//     chrome.storage.sync.set(store);
//   });

//   return {
//     data: store,
//     set: setStore,
//   };
// }

// export const Store = createRoot(createGlobalStore);
