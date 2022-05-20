import { produce } from "solid-js/store";
import { Component, createMemo, Index } from "solid-js";
import logoIcon from "./logo.png";
import { Store } from "./store";

const Logo: Component = () => {
  return (
    <div class="flex">
      <img class="h-[1em] w-auto" src={logoIcon}></img>
      <div class="w-[0.5em]"></div>
      <svg
        width="102"
        height="11"
        viewBox="0 0 102 11"
        fill="currentColor"
        class="h-[1em] w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.344 0.599999H4.224V2.04H1.92L1.884 2.112L3.804 5.616C4.196 6.32 4.392 6.856 4.392 7.224C4.392 8.032 4.124 8.624 3.588 9H0.408V7.608H2.892L2.928 7.536L0.768 3.66C0.456 3.1 0.3 2.644 0.3 2.292C0.3 1.46 0.648 0.895999 1.344 0.599999ZM5.16834 9V2.868H6.75234V9H5.16834ZM5.16834 0.599999H6.75234V2.22H5.16834V0.599999ZM10.4456 2.868H11.2976L11.5976 3.288C11.7656 3.136 11.9256 3.028 12.0776 2.964C12.2376 2.9 12.4736 2.868 12.7856 2.868H14.1176C14.4696 3.316 14.7096 3.764 14.8376 4.212C14.9656 4.66 15.0296 5.22 15.0296 5.892V9H13.4336V5.772C13.4336 5.036 13.3216 4.488 13.0976 4.128H11.9456C12.1216 4.472 12.2096 4.94 12.2096 5.532V9H10.6136V5.772C10.6136 5.012 10.5096 4.464 10.3016 4.128H9.37763V9H7.78163V2.868H9.02962L9.24563 3.3C9.42163 3.14 9.58563 3.028 9.73763 2.964C9.89763 2.9 10.1336 2.868 10.4456 2.868ZM16.0082 2.868H17.2922L17.4722 3.3C17.6482 3.14 17.8122 3.028 17.9642 2.964C18.1242 2.9 18.3602 2.868 18.6722 2.868H19.7522C20.0882 3.196 20.3522 3.62 20.5442 4.14C20.7362 4.66 20.8322 5.232 20.8322 5.856C20.8322 7.192 20.4322 8.24 19.6322 9H18.6122C18.1882 9 17.8522 8.888 17.6042 8.664V10.8H16.0082V2.868ZM17.6042 7.74H18.7562C19.0522 7.236 19.2002 6.624 19.2002 5.904C19.2002 5.184 19.0482 4.592 18.7442 4.128H17.6042V7.74ZM23.2758 0.599999V9H21.6918V0.599999H23.2758ZM27.0771 4.128H26.1771C26.0571 4.272 25.9571 4.472 25.8771 4.728C25.8051 4.984 25.7691 5.232 25.7691 5.472H27.4851C27.5011 5.232 27.4691 4.984 27.3891 4.728C27.3091 4.464 27.2051 4.264 27.0771 4.128ZM28.7091 7.74V9H25.6611C25.1011 8.624 24.7051 8.16 24.4731 7.608C24.2491 7.048 24.1371 6.484 24.1371 5.916C24.1371 4.604 24.6331 3.588 25.6251 2.868H27.5691C28.1051 3.26 28.4691 3.676 28.6611 4.116C28.8531 4.556 28.9491 5 28.9491 5.448C28.9491 5.896 28.9131 6.28 28.8411 6.6H25.8531C25.8771 6.784 25.9451 6.996 26.0571 7.236C26.1771 7.468 26.3051 7.636 26.4411 7.74H28.7091ZM33.3802 9H31.7362V0.599999H33.3802V3.984H35.3002V0.599999H36.9442V9H35.3002V5.52H33.3802V9ZM40.8114 4.128H39.9114C39.7914 4.272 39.6914 4.472 39.6114 4.728C39.5394 4.984 39.5034 5.232 39.5034 5.472H41.2194C41.2354 5.232 41.2034 4.984 41.1234 4.728C41.0434 4.464 40.9394 4.264 40.8114 4.128ZM42.4434 7.74V9H39.3954C38.8354 8.624 38.4394 8.16 38.2074 7.608C37.9834 7.048 37.8714 6.484 37.8714 5.916C37.8714 4.604 38.3674 3.588 39.3594 2.868H41.3034C41.8394 3.26 42.2034 3.676 42.3954 4.116C42.5874 4.556 42.6834 5 42.6834 5.448C42.6834 5.896 42.6474 6.28 42.5754 6.6H39.5874C39.6114 6.784 39.6794 6.996 39.7914 7.236C39.9114 7.468 40.0394 7.636 40.1754 7.74H42.4434ZM46.3807 6.228H45.0967C44.9287 6.436 44.8447 6.696 44.8447 7.008C44.8447 7.32 44.9327 7.564 45.1087 7.74H46.3807V6.228ZM43.8007 2.868H46.7767C47.2567 3.156 47.5727 3.488 47.7247 3.864C47.8767 4.232 47.9527 4.736 47.9527 5.376V7.176C47.9527 7.84 47.9687 8.448 48.0007 9H46.6327L46.4167 8.568C46.1047 8.856 45.6647 9 45.0967 9H44.3407C43.6607 8.552 43.3207 7.908 43.3207 7.068C43.3207 6.22 43.6687 5.552 44.3647 5.064H45.4927C45.8047 5.064 46.0967 5.16 46.3687 5.352V4.752C46.3687 4.44 46.2327 4.232 45.9607 4.128H43.8007V2.868ZM53.6288 9H52.4168L52.2008 8.568C52.0248 8.728 51.8568 8.84 51.6968 8.904C51.5448 8.968 51.3128 9 51.0008 9H49.9568C49.6048 8.664 49.3248 8.224 49.1168 7.68C48.9168 7.136 48.8168 6.528 48.8168 5.856C48.8168 5.176 48.9168 4.6 49.1168 4.128C49.3248 3.656 49.6168 3.236 49.9928 2.868H51.0248C51.4488 2.868 51.7848 2.98 52.0328 3.204V0.599999H53.6288V9ZM52.0328 4.128H50.8808C50.5848 4.632 50.4368 5.252 50.4368 5.988C50.4368 6.716 50.5808 7.3 50.8688 7.74H52.0328V4.128ZM57.4286 4.128H56.5286C56.4086 4.272 56.3086 4.472 56.2286 4.728C56.1566 4.984 56.1206 5.232 56.1206 5.472H57.8366C57.8526 5.232 57.8206 4.984 57.7406 4.728C57.6606 4.464 57.5566 4.264 57.4286 4.128ZM59.0606 7.74V9H56.0126C55.4526 8.624 55.0566 8.16 54.8246 7.608C54.6006 7.048 54.4886 6.484 54.4886 5.916C54.4886 4.604 54.9846 3.588 55.9766 2.868H57.9206C58.4566 3.26 58.8206 3.676 59.0126 4.116C59.2046 4.556 59.3006 5 59.3006 5.448C59.3006 5.896 59.2646 6.28 59.1926 6.6H56.2046C56.2286 6.784 56.2966 6.996 56.4086 7.236C56.5286 7.468 56.6566 7.636 56.7926 7.74H59.0606ZM60.1178 9V2.868H61.2578L61.5578 3.516C61.8778 3.084 62.2818 2.868 62.7698 2.868H63.2378V4.476H61.7138V9H60.1178ZM68.968 5.16H68.92H68.968L69.604 2.532L70.12 0.599999H71.62L72.16 9H70.588L70.36 4.416H70.3L69.436 7.8H68.452L67.588 4.416H67.528L67.3 9H65.728L66.268 0.599999H67.768L68.284 2.532L68.92 5.16H68.968ZM76.7148 9H74.0988C73.2988 8.256 72.8988 7.24 72.8988 5.952C72.8988 5.304 72.9868 4.74 73.1628 4.26C73.3468 3.78 73.6348 3.316 74.0268 2.868H76.8348C77.2508 3.348 77.5348 3.816 77.6868 4.272C77.8388 4.72 77.9148 5.28 77.9148 5.952C77.9148 7.24 77.5148 8.256 76.7148 9ZM74.9508 7.74H75.8628C76.1508 7.18 76.2948 6.544 76.2948 5.832C76.2948 5.12 76.1468 4.552 75.8508 4.128H74.9508C74.6628 4.536 74.5188 5.116 74.5188 5.868C74.5188 6.612 74.6628 7.236 74.9508 7.74ZM83.4178 9H82.2058L81.9898 8.568C81.8138 8.728 81.6458 8.84 81.4858 8.904C81.3338 8.968 81.1018 9 80.7898 9H79.7458C79.3938 8.664 79.1138 8.224 78.9058 7.68C78.7058 7.136 78.6058 6.528 78.6058 5.856C78.6058 5.176 78.7058 4.6 78.9058 4.128C79.1138 3.656 79.4058 3.236 79.7818 2.868H80.8138C81.2378 2.868 81.5738 2.98 81.8218 3.204V0.599999H83.4178V9ZM81.8218 4.128H80.6698C80.3738 4.632 80.2258 5.252 80.2258 5.988C80.2258 6.716 80.3698 7.3 80.6578 7.74H81.8218V4.128ZM84.4457 9V2.868H86.0297V9H84.4457ZM84.4457 0.599999H86.0297V2.22H84.4457V0.599999ZM88.667 0.599999H89.915V1.86H89.315C89.043 2.028 88.907 2.364 88.907 2.868H91.979V9H90.395V4.128H88.907V9H87.311V4.128H86.651V2.868H87.311C87.311 1.828 87.763 1.072 88.667 0.599999ZM90.395 0.599999H91.979V2.22H90.395V0.599999ZM95.7841 4.128H94.8841C94.7641 4.272 94.6641 4.472 94.5841 4.728C94.5121 4.984 94.4761 5.232 94.4761 5.472H96.1921C96.2081 5.232 96.1761 4.984 96.0961 4.728C96.0161 4.464 95.9121 4.264 95.7841 4.128ZM97.4161 7.74V9H94.3681C93.8081 8.624 93.4121 8.16 93.1801 7.608C92.9561 7.048 92.8441 6.484 92.8441 5.916C92.8441 4.604 93.3401 3.588 94.3321 2.868H96.2761C96.8121 3.26 97.1761 3.676 97.3681 4.116C97.5601 4.556 97.6561 5 97.6561 5.448C97.6561 5.896 97.6201 6.28 97.5481 6.6H94.5601C94.5841 6.784 94.6521 6.996 94.7641 7.236C94.8841 7.468 95.0121 7.636 95.1481 7.74H97.4161ZM98.4733 9V2.868H99.6133L99.9133 3.516C100.233 3.084 100.637 2.868 101.125 2.868H101.593V4.476H100.069V9H98.4733Z" />
      </svg>
    </div>
  );
};

const PopupHeader: Component = () => {
  function toggleGlobalActive(active: boolean) {
    Store.set(
      produce((d) => {
        d.globalActive = active;
      })
    );
  }
  return (
    <div class="flex items-center justify-between">
      <h1 class="text-base-content text-lg font-semibold">
        <Logo></Logo>
      </h1>
      <input
        type="checkbox"
        class="toggle toggle-accent"
        checked={Store.data.globalActive}
        onChange={(e) => toggleGlobalActive(e.currentTarget.checked)}
      />
    </div>
  );
};

const PairInput: Component<{ i: number; class?: string }> = (props) => {
  const item = createMemo(() => Store.data.pairs[props.i]);

  function setKey(val: string) {
    Store.set(
      produce((d) => {
        d.pairs[props.i].headerKey = val;
      })
    );
  }

  function setValue(val: string) {
    Store.set(
      produce((d) => {
        d.pairs[props.i].headerValue = val;
      })
    );
  }

  const isKeyConflict = createMemo(() => {
    const curItem = item();
    for (let i = 0; i < props.i; i++) {
      const prevItem = Store.data.pairs[i];
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
        spellcheck={false}
        class="input input-sm input-bordered block w-[10em]"
        classList={{
          "input-error": isKeyConflict(),
          "line-through text-base-content/50": !item().active,
        }}
        placeholder="Header Key"
        value={item().headerKey}
        onInput={(e) => setKey(e.currentTarget.value)}
      ></input>
      <input
        class="input input-sm input-bordered block flex-grow"
        classList={{
          "line-through text-base-content/50": !item().active,
        }}
        placeholder="Value"
        value={item().headerValue}
        onInput={(e) => setValue(e.currentTarget.value)}
      ></input>
    </div>
  );
};

const PairStatusButton: Component<{ i: number; class?: string }> = (props) => {
  const isActive = createMemo(() => Store.data.pairs[props.i].active);

  function toggleActive() {
    Store.set(
      produce((d) => {
        d.pairs[props.i].active = !isActive();
      })
    );
  }

  return (
    <label
      class={`swap btn btn-circle btn-xs btn-link ${props.class}}`}
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
    Store.set(
      produce((d) => {
        d.pairs.splice(props.i, 1);
      })
    );
  }

  const isLastOne = createMemo(() => Store.data.pairs.length === 1);

  return (
    <label
      class={`btn btn-circle btn-xs btn-link ${props.class}`}
      classList={{
        "btn-disabled": isLastOne(),
        "text-error": !isLastOne(),
      }}
      onClick={deleteItem}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
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
    Store.set(
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

async function init() {}

const App: Component = () => {
  init();
  return (
    <div class="w-[460px] max-h-[600px] overflow-y-auto p-4">
      <PopupHeader />
      <div class="divider my-2"></div>
      <div class="space-y-2">
        <Index each={Store.data.pairs}>
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
};

export default App;
