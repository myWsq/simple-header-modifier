import { ActionButton, Switch } from "@adobe/react-spectrum";
import clsx from "clsx";
import produce from "immer";
import { useRecoilState } from "recoil";
import { currentRuleState } from "../store";
import { assert } from "../utils/assert";
import { TrashIcon } from "@heroicons/react/outline";

export const TabPanelHeader = () => {
  const [currentRule, setCurrentRule] = useRecoilState(currentRuleState);
  assert(currentRule);

  function newLine() {
    setCurrentRule(
      produce((d) => {
        assert(d);
        d.headers.push({ active: true, key: "", value: "" });
      })
    );
  }

  function deleteLine(index: number) {
    setCurrentRule(
      produce((d) => {
        assert(d);
        d.headers.splice(index, 1);
      })
    );
  }

  const className = {
    th: "h-8 font-medium text-center border-l",
    input:
      "block px-2 w-full h-8 bg-transparent text-inherit focus:outline-none",
    inputTd: "ring-inset ring-blue-500 transition-shadow focus-within:ring-1",
  };

  return (
    <>
      <table
        aria-label="Header table"
        className="w-full  border-collapse ml-[-1px] "
      >
        <thead>
          <tr>
            <th className={clsx(className.th, "w-[15%]")}>Active</th>
            <th className={clsx(className.th, "w-[35%]")}>Key</th>
            <th className={clsx(className.th, "w-[50%]")}>Value</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-black">
          {!currentRule.headers.length && (
            <tr className="text-center">
              <td colSpan={3} className="h-8 border-t">
                No Data
              </td>
            </tr>
          )}
          {currentRule.headers.map((item, index) => (
            <tr key={index} className="relative group">
              <td className="text-center border-t border-l">
                <Switch
                  UNSAFE_style={{ marginRight: 0 }}
                  isEmphasized
                  isSelected={item.active}
                  aria-label="Active checkbox"
                  onChange={(e) =>
                    setCurrentRule(
                      produce((d) => {
                        assert(d);
                        d.headers[index].active = e;
                      })
                    )
                  }
                ></Switch>
              </td>
              <td className={clsx(className.inputTd, "border-l border-t")}>
                <input
                  autoFocus={!item.key}
                  className={className.input}
                  value={item.key}
                  onChange={(e) =>
                    setCurrentRule(
                      produce((d) => {
                        assert(d);
                        d.headers[index].key = e.currentTarget.value;
                      })
                    )
                  }
                ></input>
              </td>
              <td className={clsx(className.inputTd, "border-l border-t")}>
                <input
                  className={className.input}
                  value={item.value}
                  onChange={(e) =>
                    setCurrentRule(
                      produce((d) => {
                        assert(d);
                        d.headers[index].value = e.currentTarget.value;
                      })
                    )
                  }
                ></input>
                <div className="flex absolute top-0 bottom-0 right-2 items-center">
                  <TrashIcon
                    className="hidden p-1 w-4 h-4 text-red-500 cursor-pointer group-hover:block hover:text-red-400"
                    onClick={() => deleteLine(index)}
                  ></TrashIcon>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sticky bottom-0 p-2 pb-3 space-x-2 bg-[color:var(--spectrum-alias-background-color-default)] border-t">
        <ActionButton
          onPress={newLine}
          UNSAFE_className="!px-0 !h-6 !font-semibold"
        >
          New Line
        </ActionButton>
      </div>
    </>
  );
};
