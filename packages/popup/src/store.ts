import produce from "immer";
import { atom, AtomEffect, selector } from "recoil";
import { RuleSchema, RuleSchemaType } from "shared/schemas";
import { GLOBAL_ACTIVE_STORAGE_KEY, RULE_LIST_STORAGE_KEY } from "shared/const";

export type History = Record<
  string,
  {
    time: number;
    url: string;
  }[]
>;

const syncStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const loadPersisted = async () => {
      const data = await chrome.storage.sync.get(key);
      const savedValue = data[key];
      if (savedValue !== undefined) {
        setSelf(savedValue);
      }
    };

    loadPersisted();

    onSet((newValue, _, isReset) => {
      isReset
        ? chrome.storage.sync.remove(key)
        : chrome.storage.sync.set({
            [key]: newValue,
          });

      // isReset
      //   ? localStorage.removeItem(combinedKey)
      //   : localStorage.setItem(combinedKey, JSON.stringify(newValue));
    });

    const storageChangedHandler: Parameters<
      typeof chrome.storage.onChanged.addListener
    >[0] = (e, areaName) => {
      if (areaName === "sync") {
        const data = e[key]?.newValue;
        if (data !== undefined) {
          setSelf(data);
        }
      }
    };

    chrome.storage.onChanged.addListener(storageChangedHandler);

    return () => {
      chrome.storage.onChanged.removeListener(storageChangedHandler);
    };
  };

export const globalActiveState = atom({
  key: "globalActive",
  default: false,
  effects: [syncStorageEffect(GLOBAL_ACTIVE_STORAGE_KEY)],
});

export const ruleListState = atom<RuleSchemaType[]>({
  key: "ruleList",
  default: [],
  effects: [syncStorageEffect(RULE_LIST_STORAGE_KEY)],
});

const historyState = atom<History>({
  key: "history",
  default: {},
});

export const currentRuleIndexState = atom({
  key: "currentRuleIndex",
  default: -1,
});

export const currentRuleState = selector<RuleSchemaType | undefined>({
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
