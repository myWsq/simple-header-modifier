import { ActionGroup, Item, Switch } from "@adobe/react-spectrum";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import produce from "immer";
import React, { useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useSWR from "swr";
import {
  currentRuleIndexState,
  currentRuleState,
  logsSelector,
  ruleDataState,
} from "../store";

import { RuleSchema } from "shared/schemas";
import { request } from "../utils/request";

const SidebarItem: React.FC<{ ruleIndex: number }> = ({ ruleIndex }) => {
  const [ruleData, setRuleData] = useRecoilState(ruleDataState);
  const [currentRuleId, setCurrentRuleId] = useRecoilState(
    currentRuleIndexState
  );
  const rule = ruleData.list[ruleIndex];
  const logs = useRecoilValue(logsSelector(ruleIndex));

  return (
    <div
      className={clsx(
        "py-1.5 px-2 cursor-pointer relative",
        ruleIndex === currentRuleId &&
          "bg-neutral-200 dark:bg-neutral-700 rounded"
      )}
      onClick={() => setCurrentRuleId(ruleIndex)}
    >
      <div className="flex items-center space-x-2">
        <span
          className={clsx(
            "block w-3 h-3 rounded-full border-2 cursor-pointer flex-shrink-0",
            rule.active
              ? "bg-green-200 border-green-400 dark:bg-green-200 dark:border-green-600"
              : "bg-neutral-200 border-neutral-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setRuleData(
              produce((d) => {
                d.list[ruleIndex].active = !d.list[ruleIndex].active;
              })
            );
          }}
        ></span>
        <span className="font-medium truncate">{rule.name || "Untitled"}</span>
      </div>
      <div
        className="text-sm truncate scale-75"
        title={rule.matchConfig[rule.matchConfig.matchMode]}
      >
        {rule.matchConfig[rule.matchConfig.matchMode] || "(Match all)"}
      </div>
      {logs.length > 0 && (
        <div className="flex absolute top-0 right-0 bottom-1 justify-center items-center">
          <span className="block px-1 py-0.5 leading-none text-white bg-blue-500 rounded-full scale-75">
            {logs.length > 99 ? "99+" : logs.length}
          </span>
        </div>
      )}
    </div>
  );
};

const SidebarHeader = () => {
  const { data: globalActive, mutate: mutateGlobalActive } =
    useSWR("getGlobalActive");

  async function setGlobalActive(val: boolean) {
    await request("setGlobalActive", val);
    await mutateGlobalActive(val);
  }

  const setRuleList = useSetRecoilState(ruleDataState);
  const [currentRuleIndex, setCurrentRuleId] = useRecoilState(
    currentRuleIndexState
  );

  const onAction = (key: React.Key) => {
    switch (key) {
      case "add":
        setRuleList(
          produce((d) => {
            d.list.unshift(RuleSchema.parse({}));
          })
        );
        setCurrentRuleId(0);
        break;

      case "delete":
        setRuleList(
          produce((d) => {
            d.list.splice(currentRuleIndex, 1);
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
  const ruleData = useRecoilValue(ruleDataState);

  useLayoutEffect(() => {
    if (!currentRule && ruleData.list.length) {
      setCurrentRuleIndex(0);
    }
  }, [currentRule, setCurrentRuleIndex, ruleData]);

  return null;
};

export const Sidebar = () => {
  const ruleList = useRecoilValue(ruleDataState);

  return (
    <>
      <RuleIndexEffect></RuleIndexEffect>
      <div className="flex flex-col h-full">
        <div className="flex sticky top-0 justify-between p-2 border-b dark:border-white/10">
          <SidebarHeader />
        </div>
        <div className="overflow-auto flex-grow p-2">
          {ruleList.list.map((_, id) => (
            <SidebarItem key={id} ruleIndex={id}></SidebarItem>
          ))}
        </div>
      </div>
    </>
  );
};
