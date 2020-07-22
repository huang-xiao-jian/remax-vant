/**
 * @description - several type detect function
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { ReactNode, isValidElement, JSXElementConstructor } from 'react';

export const isFunction = (material: unknown): boolean => {
  return typeof material === 'function';
};

// 判断 react element 特定类型
export const isGeneticChild = (
  child: ReactNode,
  matcher: JSXElementConstructor<any>
): boolean => {
  return isValidElement(child) && child.type === matcher;
};
