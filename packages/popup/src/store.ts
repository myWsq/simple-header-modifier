import produce from "immer";
import { atom, AtomEffect, selector } from "recoil";
import { z } from "zod";

const STORAGE_VERSION = "v2";

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

export const RuleSchema = z.object({
  active: z.boolean().default(true),
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
    matchMode: z.string(),
    matchValue: z.string(),
    methods: z.array(z.string()).default(AVAILABLE_METHODS),
  }),
  resourceTypes: z.array(z.string()).default(["main_frame"]),
});

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

    onSet((newValue) => {
      // chrome.storage.sync.set({
      //   [combinedKey]: newValue,
      // });
      localStorage.setItem(combinedKey, JSON.stringify(newValue));
    });
  };

export const globalActiveState = atom({
  key: "globalActive",
  default: false,
  effects: [syncStorageEffect("globalActive")],
});

export const ruleMapState = atom<Record<string, Rule>>({
  key: "ruleMap",
  default: {},
  effects: [syncStorageEffect("ruleMap")],
});

const historyState = atom<History>({
  key: "history",
  default: {},
});

export const currentRuleIdState = atom<string | null>({
  key: "currentRuleId",
  default: null,
});

export const currentRuleState = selector({
  key: "currentRule",
  get({ get }) {
    const currentRuleId = get(currentRuleIdState);
    const ruleMap = get(ruleMapState);
    return currentRuleId ? ruleMap[currentRuleId] : null;
  },
  set({ get, set }, newValue) {
    const currentRuleId = get(currentRuleIdState);
    if (currentRuleId && newValue) {
      set(
        ruleMapState,
        produce((d) => {
          d![currentRuleId] = RuleSchema.parse(newValue);
        })
      );
    }
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
