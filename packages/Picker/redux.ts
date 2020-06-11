/**
 * @description - manage picker internal state, give up vant-weapp complicated logic
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import { Reducer } from 'react';
// internal
import omit from '../tools/omit';

export enum PickerActionTypes {
  REGISTER = 'REGISTER',
  MUTATION = 'MUTATION',
  DROP = 'DROP',
}

interface RegisterVariableAction {
  type: PickerActionTypes.REGISTER;
  payload: {
    key: string;
    value: number;
  };
}

interface MutateVariableAction {
  type: PickerActionTypes.MUTATION;
  payload: {
    key: string;
    value: number;
  };
}

interface DropVariableAction {
  type: PickerActionTypes.DROP;
  payload: string[];
}

type PickerState = Record<string, number>;

type PickerAction =
  | RegisterVariableAction
  | MutateVariableAction
  | DropVariableAction;

export type PickerReducerAbstract = Reducer<PickerState, PickerAction>;

// TODO - determine whether handle boundary beyond issue
export const reducer: (
  state: PickerState,
  action: PickerAction
) => PickerState = (state, action) => {
  switch (action.type) {
    // columns 变更处理
    case PickerActionTypes.REGISTER:
      return {
        ...state,
        [action.payload.key]: Reflect.has(state, action.payload.key)
          ? state[action.payload.key]
          : action.payload.value,
      };
    case PickerActionTypes.MUTATION:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case PickerActionTypes.DROP:
      return omit(state, action.payload);
    default:
      throw new Error('non-supported action triggered, review weired code');
  }
};
