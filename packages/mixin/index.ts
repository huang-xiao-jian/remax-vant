/**
 * @description - use interface substitute original mixin
 */

// packages
import { ButtonProps } from 'remax/wechat';

export type OpenTypeMixin = Pick<
  ButtonProps,
  | 'openType'
  | 'onGetUserInfo'
  | 'onContact'
  | 'onGetPhoneNumber'
  | 'onError'
  | 'onLaunchApp'
  | 'onOpenSetting'
>;

// Changes, not found in original interfaces
//   1. id
//   2. ariaLabel
export type ButtonMixin = Pick<
  ButtonProps,
  | 'lang'
  | 'sessionFrom'
  | 'sendMessageTitle'
  | 'sendMessagePath'
  | 'sendMessageImg'
  | 'showMessageCard'
  | 'appParameter'
>;
