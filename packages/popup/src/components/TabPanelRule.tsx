import {
  Checkbox,
  CheckboxGroup,
  Form,
  Radio,
  RadioGroup,
  TextArea,
} from "@adobe/react-spectrum";
import produce from "immer";
import { useRecoilState } from "recoil";
import { AVAILABLE_METHODS, currentRuleState } from "../store";

export const TabPanelMatchRule = () => {
  const [currentRule, setCurrentRule] = useRecoilState(currentRuleState);

  if (!currentRule) {
    return null;
  }

  const { matchConfig: config } = currentRule;

  return (
    <div className="px-4">
      <Form>
        <RadioGroup
          orientation="horizontal"
          label="Match Mode"
          isEmphasized
          value={config.matchMode}
          onChange={(val) => {
            setCurrentRule(
              produce((d) => {
                d!.matchConfig.matchMode = val;
              })
            );
          }}
        >
          <Radio value="domain">Domain</Radio>
          <Radio value="regexp">Regexp</Radio>
        </RadioGroup>
        <TextArea
          label="Match Value"
          description="Enter domains each line"
          validationState={"invalid"}
        />
        <CheckboxGroup
          label="HTTP Methods"
          orientation="horizontal"
          value={config.methods}
          onChange={(val) => {
            setCurrentRule(
              produce((d) => {
                d!.matchConfig.methods = val;
              })
            );
          }}
        >
          {AVAILABLE_METHODS.map((item) => (
            <Checkbox key={item} value={item}>
              {item}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Form>
    </div>
  );
};
