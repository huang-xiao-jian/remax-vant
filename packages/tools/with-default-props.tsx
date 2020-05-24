// packages
import React, { ComponentType } from 'react';

export default function withDefaultProps<P>(defaultProps: P) {
  return (Component: ComponentType<P>) => (props: Partial<P>) => (
    <Component {...defaultProps} {...props} />
  );
}
