/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @description - wrap inner component properties with more precision
 */
// packages
import React, { ComponentType, PropsWithChildren } from 'react';

// A --> acceptable props without neutral props
// D --> neutral props
export default function withDefaultProps<A, D>(defaultProps: D) {
  return (Component: ComponentType<A & D>) => (
    props: PropsWithChildren<A & Partial<D>>
  ) => <Component {...defaultProps} {...props} />;
}
