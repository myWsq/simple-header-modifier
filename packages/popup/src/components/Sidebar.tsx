import { ActionGroup, Item, Switch } from "@adobe/react-spectrum";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentRuleIndexState,
  currentRuleState,
  globalActiveState,
  ruleListState,
  RuleSchema,
} from "../store";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";
import React from "react";
import produce from "immer";
import clsx from "clsx";
import { useRecoilValue } from "recoil";

const SidebarItem: React.FC<{ ruleIndex: number }> = ({ ruleIndex }) => {
  const [ruleList, setRuleList] = useRecoilState(ruleListState);
  const [currentRuleId, setCurrentRuleId] = useRecoilState(
    currentRuleIndexState
  );

  const rule = ruleList[ruleIndex];

  return (
    <div
      className={clsx(
        "py-1.5 px-2 cursor-pointer",
        ruleIndex === currentRuleId &&
          "bg-neutral-200 dark:bg-neutral-700 rounded"
      )}
      onClick={() => setCurrentRuleId(ruleIndex)}
    >
      <div className="flex items-center space-x-2">
        <span
          className={clsx(
            "block w-3 h-3 rounded-full border-2 cursor-pointer",
            rule.active
              ? "bg-green-200 border-green-400 dark:bg-green-200 dark:border-green-600"
              : "bg-neutral-200 border-neutral-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setRuleList(
              produce((d) => {
                d[ruleIndex].active = !d[ruleIndex].active;
              })
            );
          }}
        ></span>
        <span className="font-medium">{rule.name || "Untitled"}</span>
      </div>
      <div
        className="text-sm truncate scale-75"
        title={rule.matchConfig.regexp}
      >
        {rule.matchConfig.regexp || "(Match none)"}
      </div>
    </div>
  );
};

const SidebarHeader = () => {
  const [globalActive, setGlobalActive] = useRecoilState(globalActiveState);
  const setRuleList = useSetRecoilState(ruleListState);
  const [currentRuleIndex, setCurrentRuleId] = useRecoilState(
    currentRuleIndexState
  );

  const onAction = (key: React.Key) => {
    switch (key) {
      case "add":
        setRuleList(
          produce((d) => {
            d.unshift(
              RuleSchema.parse({
                matchConfig: {
                  name: "Match All",
                  regexp: "",
                },
              })
            );
          })
        );
        setCurrentRuleId(0);
        break;

      case "delete":
        setRuleList(
          produce((d) => {
            d.splice(currentRuleIndex, 1);
          })
        );
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

const RuleIndexEffect = () => {
  const currentRule = useRecoilValue(currentRuleState);
  const setCurrentRuleIndex = useSetRecoilState(currentRuleIndexState);
  const ruleList = useRecoilValue(ruleListState);
  if (!currentRule && ruleList.length) {
    setCurrentRuleIndex(0);
  }

  return null;
};

export const Sidebar = () => {
  const ruleList = useRecoilValue(ruleListState);

  return (
    <>
      <RuleIndexEffect></RuleIndexEffect>
      <div className="flex flex-col h-full">
        <div className="flex sticky top-0 justify-between p-2 border-b dark:border-white/10">
          <SidebarHeader />
        </div>
        <div className="overflow-auto flex-grow p-2">
          {ruleList.map((_, id) => (
            <SidebarItem key={id} ruleIndex={id}></SidebarItem>
          ))}
        </div>
      </div>
    </>
  );
};
