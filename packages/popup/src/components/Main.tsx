import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";
import { TabPanelHeader } from "./TabPanelHeader";
import { TabPanelMatchRule } from "./TabPanelRule";

export const Main = () => {
  return (
    <Tabs UNSAFE_className="h-full">
      <div className="flex flex-col h-full">
        <div className="mt-[1px] flex overflow-hidden justify-center border-b flex-shrink-0">
          <TabList UNSAFE_className="mb-[-1px]">
            <Item>Headers</Item>
            <Item>Match Rule</Item>
            <Item>Match History</Item>
          </TabList>
        </div>
        <div className="overflow-auto flex-grow">
          <TabPanels>
            <Item>
              <TabPanelHeader />
            </Item>
            <Item>
              <TabPanelMatchRule />
            </Item>
            <Item>Alea jacta est.</Item>
          </TabPanels>
        </div>
      </div>
    </Tabs>
  );
};
