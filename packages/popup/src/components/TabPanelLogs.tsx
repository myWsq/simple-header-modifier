import { useRecoilValue } from "recoil";
import { currentRuleIndexState, logsSelector, logsState } from "../store";

export function TabPanelLogs() {
  const currentRuleIndex = useRecoilValue(currentRuleIndexState);
  const logs = useRecoilValue(logsSelector(currentRuleIndex));

  if (!logs?.length) {
    return <div className="py-8 text-center">No data, try reload page</div>;
  }

  return (
    <ul className="p-2 space-y-1">
      {logs.map((item, i) => (
        <li key={i} className="whitespace-nowrap">
          <span className="inline-block px-1 min-w-[4px] mr-2 text-sm font-semibold text-orange-600 uppercase bg-orange-100 rounded-md scale-[0.8]">
            {item.method}
          </span>
          {item.url}
        </li>
      ))}
    </ul>
  );
}
