// packages
import {
  FunctionComponent,
  ReactElement,
  Children,
  isValidElement,
} from 'react';

interface CaseProps {
  in?: boolean;
  default?: boolean;
}

interface SelectProps {
  in?: boolean;
}

// notice here, react element children required
export const Select: FunctionComponent<SelectProps> = (props) => {
  return props.in ? (props.children as ReactElement) : null;
};

export const Case: FunctionComponent<CaseProps> = (props) =>
  (props.children as ReactElement) || null;

// default case must be provided
export const Switch: FunctionComponent = (props) => {
  let match = null;
  let fallback = null;

  Children.forEach(props.children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Case) {
        if (child.props.in) {
          match = child;
        }

        if (child.props.default) {
          fallback = child;
        }
      }
    }
  });

  return match || fallback;
};
