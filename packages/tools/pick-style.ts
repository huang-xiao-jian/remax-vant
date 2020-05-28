/**
 * @description - ignore void key-value pair from CSSProperties
 */

// packages
import pickby from 'lodash.pickby';
import { CSSProperties } from 'react';

export default function pickStyle(element: CSSProperties): CSSProperties {
  return pickby(element, (value) => !!value);
}
