import { ActionGroup, Item, Switch } from "@adobe/react-spectrum";
import { useRecoilState } from "recoil";
import { globalActiveState } from "../store";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/react/solid";

export const Sidebar = () => {
  const [globalActive, setGlobalActive] = useRecoilState(globalActiveState);

  return (
    <div className="flex flex-col h-full">
      <div className="flex sticky top-0 justify-between p-2 border-b dark:border-white/10">
        <Switch
          isEmphasized
          isSelected={globalActive}
          onChange={setGlobalActive}
          aria-label="Global active"
        ></Switch>
        <ActionGroup density="compact">
          <Item key="add">
            <PlusSmIcon className="w-5 h-5"></PlusSmIcon>
          </Item>
          <Item key="delete">
            <MinusSmIcon className="w-5 h-5"></MinusSmIcon>
          </Item>
        </ActionGroup>
      </div>
      <div className="overflow-auto flex-grow">
        <div className="h-[2000px]"></div>
      </div>
    </div>
  );
};
