import { Logo } from "./components/Logo";
import { createStore, produce } from "solid-js/store";
import {
  Component,
  createEffect,
  createMemo,
  For,
  Index,
  observable,
} from "solid-js";

type PairItem = {
  headerKey: string;
  headerValue: string;
  active: boolean;
};

type Store = {
  globalActive: boolean;
  pairs: PairItem[];
};

const [store, setStore] = createStore<Store>({
  globalActive: false,
  pairs: [{ headerKey: "", headerValue: "", active: true }],
});

async function init() {
  console.log(chrome.storage.sync);
  createEffect(() => {
    console.log(store.globalActive);
  });

  // const tab = await chrome.tabs.getCurrent();
  // chrome.action.setIcon({
  //   path: {
  //     16: "../icons/icon_active_16x16.png",
  //     32: "../icons/icon_active_32x32.png",
  //     48: "../icons/icon_active_48x48.png",
  //     128: "../icons/icon_active_128x128.png",
  //   },
  // });
}

function PopupHeader() {
  function toggleGlobalActive(active: boolean) {
    setStore(
      produce((d) => {
        d.globalActive = active;
      })
    );
  }
  return (
    <div class="flex items-center justify-between">
      <h1 class="text-primary-content text-lg font-semibold">
        <Logo></Logo>
      </h1>
      <input
        type="checkbox"
        class="toggle toggle-accent"
        checked={store.globalActive}
        onChange={(e) => toggleGlobalActive(e.currentTarget.checked)}
      />
    </div>
  );
}

const PairInput: Component<{ i: number; class?: string }> = (props) => {
  const item = createMemo(() => store.pairs[props.i]);

  function setKey(val: string) {
    setStore(
      produce((d) => {
        d.pairs[props.i].headerKey = val;
      })
    );
  }

  function setValue(val: string) {
    setStore(
      produce((d) => {
        d.pairs[props.i].headerValue = val;
      })
    );
  }

  const isKeyConflict = createMemo(() => {
    const curItem = item();
    for (let i = 0; i < props.i; i++) {
      const prevItem = store.pairs[i];
      if (
        curItem.headerKey &&
        curItem.active &&
        prevItem.active &&
        prevItem.headerKey === curItem.headerKey
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <div class={`flex space-x-2 ${props.class}`}>
      <input
        disabled={!item().active}
        spellcheck={false}
        class="input input-sm input-bordered block w-[10em]"
        classList={{
          "input-error": isKeyConflict(),
        }}
        placeholder="Header Key"
        value={item().headerKey}
        onInput={(e) => setKey(e.currentTarget.value)}
      ></input>
      <input
        disabled={!item().active}
        class="input input-sm input-bordered block flex-grow"
        placeholder="Value"
        value={item().headerValue}
        onInput={(e) => setValue(e.currentTarget.value)}
      ></input>
    </div>
  );
};

const PairStatusButton: Component<{ i: number; class?: string }> = (props) => {
  const isActive = createMemo(() => store.pairs[props.i].active);

  function toggleActive() {
    setStore(
      produce((d) => {
        d.pairs[props.i].active = !isActive();
      })
    );
  }

  return (
    <label
      class={`swap btn btn-circle btn-xs btn-ghost ${props.class}}`}
      classList={{
        "swap-active": isActive(),
      }}
      onClick={toggleActive}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="swap-off w-5 h-5 text-accent"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="swap-on w-5 h-5 text-warning"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
  );
};

const PairDeleteButton: Component<{ i: number; class?: string }> = (props) => {
  function deleteItem() {
    setStore(
      produce((d) => {
        d.pairs.splice(props.i, 1);
      })
    );
  }

  const isLastOne = createMemo(() => store.pairs.length === 1);

  return (
    <label
      class={`btn btn-circle btn-xs btn-ghost ${props.class}`}
      classList={{
        "btn-disabled": isLastOne(),
      }}
      onClick={deleteItem}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        classList={{
          "text-error": !isLastOne(),
        }}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
  );
};

const PairCreateButton: Component<{ class?: string }> = (props) => {
  function addNewLine() {
    setStore(
      produce((d) => {
        d.pairs.push({
          headerKey: "",
          headerValue: "",
          active: true,
        });
      })
    );
  }

  return (
    <label class="btn btn-ghost btn-xs space-x-1" onClick={addNewLine}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clip-rule="evenodd"
        />
      </svg>
      <span>New Line</span>
    </label>
  );
};

function App() {
  init();
  return (
    <div class="w-[460px] max-h-[600px] overflow-y-auto p-4">
      <PopupHeader />
      <div class="divider my-2"></div>
      <div class="space-y-2">
        <Index each={store.pairs}>
          {(_, i) => (
            <>
              <div class="flex space-x-2">
                <PairInput class="flex-grow" i={i} />
                <div class="flex items-center flex-shrink-0">
                  <PairStatusButton i={i} />
                  <PairDeleteButton i={i} />
                </div>
              </div>
            </>
          )}
        </Index>
      </div>
      <div class="h-3"></div>
      <PairCreateButton />
    </div>
  );
}

export default App;
