// packages
import React, { ComponentType, PropsWithChildren } from 'react';

export default function withDefaultProps<P>(defaultProps: P) {
  return (Component: ComponentType<P>) => (
    props: PropsWithChildren<Partial<P>>
  ) => <Component {...defaultProps} {...props} />;
}
