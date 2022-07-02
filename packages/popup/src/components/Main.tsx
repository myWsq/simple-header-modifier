import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";
import { useRecoilValue } from "recoil";
import { currentRuleState } from "../store";
import { TabPanelHeader } from "./TabPanelHeader";
import { TabPanelLogs } from "./TabPanelLogs";
import { TabPanelSettings } from "./TabPanelSettings";

const isSupportLogs = Boolean(chrome.declarativeNetRequest.onRuleMatchedDebug);

export const Main = () => {
  const currentRule = useRecoilValue(currentRuleState);

  if (!currentRule) {
    return (
      <div className="flex justify-center items-center h-full">
        No Selected Rule
      </div>
    );
  }

  return (
    <Tabs UNSAFE_className="h-full">
      <div className="flex flex-col h-full">
        <div className="mt-[1px] flex overflow-hidden justify-center border-b flex-shrink-0">
          <TabList UNSAFE_className="mb-[-1px]">
            <Item>Headers</Item>
            <Item>Settings</Item>
            {isSupportLogs ? <Item>Logs</Item> : <></>}
          </TabList>
        </div>
        <div className="overflow-auto flex-grow">
          <TabPanels UNSAFE_className="!border-none">
            <Item>
              <TabPanelHeader />
            </Item>
            <Item>
              <TabPanelSettings />
            </Item>
            {isSupportLogs ? (
              <Item>
                <TabPanelLogs></TabPanelLogs>
              </Item>
            ) : (
              <></>
            )}
          </TabPanels>
        </div>
      </div>
    </Tabs>
  );
};
