import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";
import { useRecoilValue } from "recoil";
import { currentRuleState } from "../store";
import { TabPanelHeader } from "./TabPanelHeader";
import { TabPanelSettings } from "./TabPanelSettings";

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
            <Item>Logs</Item>
          </TabList>
        </div>
        <div className="overflow-auto flex-grow">
          <TabPanels>
            <Item>
              <TabPanelHeader />
            </Item>
            <Item>
              <TabPanelSettings />
            </Item>
            <Item>Alea jacta est.</Item>
          </TabPanels>
        </div>
      </div>
    </Tabs>
  );
};
