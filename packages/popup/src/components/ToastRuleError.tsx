import { useRecoilValue } from "recoil";
import { ruleDataState } from "../store";

export const ToastRuleError: React.FC = () => {
  const { error } = useRecoilValue(ruleDataState);

  if (!error) {
    return null;
  }
  return <div className="px-4 py-1 text-sm text-red-500 bg-neutral-800/90">{error}</div>;
};
