import { atom, AtomEffect } from "recoil";

const STORAGE_VERSION = "v2";

export type Rule = {
  active: boolean;
  headers: { active: boolean; key: string; value: string }[];
  ruleSetting: {
    matchMode: "domain" | "regexp";
    matchValue: string;
    methods?: string[];
    resourceTypes?: string[];
  };
  history: {
    time: number;
    url: string;
  }[];
};

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

const currentRuleIdState = atom<string | null>({
  key: "currentRuleId",
  default: null,
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
