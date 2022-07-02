import produce from "immer";
import { atom, selector, selectorFamily } from "recoil";
import { LogSchemaType, RuleSchema, RuleSchemaType } from "shared/schemas";
import { request } from "./utils/request";

export const ruleError = atom({
  key: "ruleError",
  default: "",
});

export const globalActiveState = atom({
  key: "globalActive",
  default: false,
});

export const ruleDataState = atom<{ error: string; list: RuleSchemaType[] }>({
  key: "ruleData",
  default: {
    error: "",
    list: [],
  },
  effects: [
    ({ setSelf, onSet }) => {
      const load = async () => {
        const data = await request("getRuleData");
        setSelf(
          produce((d) => {
            d.list = data;
          })
        );
      };

      load();

      onSet(async (newValue) => {
        try {
          await request("setRuleData", newValue.list || []);
          setSelf(
            produce((d) => {
              d.error = "";
            })
          );
        } catch (error) {
          setSelf(
            produce((d) => {
              d.error = error;
            })
          );
        }
      });
    },
  ],
});

export const currentRuleIndexState = atom({
  key: "currentRuleIndex",
  default: -1,
});

export const currentRuleState = selector<RuleSchemaType | undefined>({
  key: "currentRule",
  get({ get }) {
    const currentRuleIndex = get(currentRuleIndexState);
    const ruleList = get(ruleDataState).list;
    return ruleList[currentRuleIndex];
  },
  set({ get, set }, newValue) {
    const currentRuleIndex = get(currentRuleIndexState);
    set(
      ruleDataState,
      produce((d) => {
        d.list[currentRuleIndex] = RuleSchema.parse(newValue);
      })
    );
  },
});

export const logsState = atom<LogSchemaType[]>({
  key: "logs",
  default: [],
  effects: [
    ({ setSelf }) => {
      const load = async () => {
        const [currentTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        const data = await request("getLogs", currentTab.id);
        setSelf(data);
      };

      const interval = setInterval(load, 500);

      return () => {
        clearInterval(interval);
      };
    },
  ],
});

export const logsSelector = selectorFamily<LogSchemaType[], number>({
  key: "logsSelector",
  get(ruleIndex) {
    return ({ get }) => {
      const logs = get(logsState);
      return logs.filter((item) => item.ruleId === ruleIndex + 1);
    };
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
