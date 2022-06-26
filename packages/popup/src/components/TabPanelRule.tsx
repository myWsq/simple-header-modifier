import {
  Checkbox,
  CheckboxGroup,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import produce from "immer";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AVAILABLE_METHODS,
  AVAILABLE_RESOURCE_TYPES,
  currentRuleState,
} from "../store";
import { assert } from "../utils/assert";

export const TabPanelMatchRule = () => {
  const [currentRule, setCurrentRule] = useRecoilState(currentRuleState);

  assert(currentRule);

  const [urlRegexp, setUrlRegexp] = useState(currentRule.matchConfig.regexp);

  const isUrlRegexpValid = useMemo(() => {
    try {
      new RegExp(urlRegexp);
      return true;
    } catch {
      return false;
    }
  }, [urlRegexp]);

  useEffect(() => {
    setUrlRegexp(currentRule.matchConfig.regexp || "");
  }, [currentRule]);

  useEffect(() => {
    if (isUrlRegexpValid) {
      setCurrentRule(
        produce((d) => {
          if (d) {
            d.matchConfig.regexp = urlRegexp || "";
          }
        })
      );
    }
  }, [urlRegexp, isUrlRegexpValid]);

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
        <TextField
          label="URL Regexp"
          validationState={
            urlRegexp ? (isUrlRegexpValid ? "valid" : "invalid") : undefined
          }
          value={urlRegexp}
          onChange={setUrlRegexp}
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
