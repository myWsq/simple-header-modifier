import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";

export const Main = () => {
  return (
    <Tabs UNSAFE_className="h-full">
      <div className="flex flex-col h-full">
        <div className="mt-[1px] flex overflow-hidden justify-center border-b flex-shrink-0">
          <TabList UNSAFE_className="mb-[-1px]">
            <Item key="FoR">Headers</Item>
            <Item key="MaR">Match Rule</Item>
            <Item key="Emp">History</Item>
          </TabList>
        </div>
        <div className="overflow-auto flex-grow">
          <TabPanels>
            <Item key="FoR">
              Arma virumque cano, Troiae qui primus ab oris.
              <div className="h-[2000px]"></div>
            </Item>
            <Item key="MaR">Senatus Populusque Romanus.</Item>
            <Item key="Emp">Alea jacta est.</Item>
          </TabPanels>
        </div>
      </div>
    </Tabs>
  );
};
