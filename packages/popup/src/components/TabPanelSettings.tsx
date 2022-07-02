import {
  Checkbox,
  CheckboxGroup,
  Form,
  Link,
  Radio,
  RadioGroup,
  TextField,
} from "@adobe/react-spectrum";
import produce from "immer";
import { useRecoilState } from "recoil";
import { currentRuleState } from "../store";
import { assert } from "../utils/assert";
import { AVAILABLE_METHODS, AVAILABLE_RESOURCE_TYPES } from "shared/const";

export const TabPanelSettings = () => {
  const [currentRule, setCurrentRule] = useRecoilState(currentRuleState);

  assert(currentRule);

  const { matchConfig: config } = currentRule;

  return (
    <div className="px-4 pb-4">
      <Form>
        <TextField
          label="Rule Name"
          value={currentRule.name || ""}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.name = val;
              })
            )
          }
        />

        <RadioGroup
          label="Match Mode"
          orientation="horizontal"
          isEmphasized
          value={config.matchMode}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.matchConfig.matchMode = val as any;
              })
            )
          }
        >
          <Radio value="urlFilter">URL Filter</Radio>
          <Radio value="urlRegexp">URL Regexp</Radio>
        </RadioGroup>

        <TextField
          label="URL Filter"
          value={config.urlFilter}
          isHidden={config.matchMode !== "urlFilter"}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.matchConfig.urlFilter = val;
              })
            )
          }
          description={
            <Link>
              <a
                target="_blank"
                href="https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#rules"
              >
                Learn more
              </a>
            </Link>
          }
        />

        <TextField
          label="URL Regexp"
          value={config.urlRegexp}
          isHidden={config.matchMode !== "urlRegexp"}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.matchConfig.urlRegexp = val;
              })
            )
          }
          description="eg. //example\.com"
        />

        <CheckboxGroup
          label="HTTP Methods"
          orientation="horizontal"
          value={config.methods}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.matchConfig.methods = val;
              })
            )
          }
        >
          <div className="grid grid-cols-3">
            {AVAILABLE_METHODS.map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
        <CheckboxGroup
          label="Resource Types"
          orientation="horizontal"
          value={config.resourceTypes}
          onChange={(val) =>
            setCurrentRule(
              produce((d) => {
                assert(d);
                d.matchConfig.resourceTypes = val;
              })
            )
          }
        >
          <div className="grid grid-cols-2">
            {AVAILABLE_RESOURCE_TYPES.map((item) => (
              <Checkbox key={item} value={item}>
                {item}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </Form>
    </div>
  );
};
