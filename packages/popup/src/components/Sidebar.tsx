import { ActionGroup, Item, Switch } from "@adobe/react-spectrum";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentRuleIdState,
  globalActiveState,
  ruleMapState,
  RuleSchema,
} from "../store";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import React from "react";
import produce from "immer";
import { nanoid } from "nanoid";
import clsx from "clsx";

const SidebarItem: React.FC<{ ruleId: string }> = ({ ruleId }) => {
  const [ruleMap, setRuleMap] = useRecoilState(ruleMapState);
  const [currentRuleId, setCurrentRuleId] = useRecoilState(currentRuleIdState);

  const rule = ruleMap[ruleId];

  return (
    <div
      className={clsx(
        "py-1.5 px-2 cursor-pointer",
        ruleId === currentRuleId && "bg-neutral-200 dark:bg-neutral-700 rounded"
      )}
      onClick={() => setCurrentRuleId(ruleId)}
    >
      <div className="flex items-center space-x-2">
        <span
          className={clsx(
            "block w-3 h-3 rounded-full border-2 cursor-pointer",
            rule.active
              ? "bg-neutral-200 border-neutral-500"
              : "bg-green-200 border-green-400 dark:bg-green-200 dark:border-green-600"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setRuleMap(
              produce((d) => {
                d[ruleId].active = !d[ruleId].active;
              })
            );
          }}
        ></span>
        <span>{rule.matchConfig.matchValue}</span>
      </div>
    </div>
  );
};

const SidebarHeader = () => {
  const [globalActive, setGlobalActive] = useRecoilState(globalActiveState);
  const setRuleMap = useSetRecoilState(ruleMapState);
  const [currentRuleId, setCurrentRuleId] = useRecoilState(currentRuleIdState);

  const onAction = (key: React.Key) => {
    switch (key) {
      case "add":
        const id = nanoid();
        setRuleMap(
          produce((d) => {
            d[id] = RuleSchema.parse({
              matchConfig: {
                matchMode: "domain",
                matchValue: "exmaple.com\n",
              },
            });
          })
        );
        setCurrentRuleId(id);
        break;

      case "delete":
        if (currentRuleId) {
          setRuleMap(
            produce((d) => {
              delete d[currentRuleId];
            })
          );
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Switch
        isEmphasized
        isSelected={globalActive}
        onChange={setGlobalActive}
        aria-label="Global active"
      ></Switch>
      <ActionGroup density="compact" onAction={onAction}>
        <Item key="add">
          <PlusSmIcon className="w-5 h-5"></PlusSmIcon>
        </Item>
        <Item key="delete">
          <MinusSmIcon className="w-5 h-5"></MinusSmIcon>
        </Item>
      </ActionGroup>
    </>
  );
};

export const Sidebar = () => {
  const [ruleMap, setRuleMap] = useRecoilState(ruleMapState);

  return (
    <div className="flex flex-col h-full">
      <div className="flex sticky top-0 justify-between p-2 border-b dark:border-white/10">
        <SidebarHeader />
      </div>
      <div className="overflow-auto flex-grow p-2">
        {Object.keys(ruleMap).map((id) => (
          <SidebarItem key={id} ruleId={id}></SidebarItem>
        ))}
      </div>
    </div>
  );
};
