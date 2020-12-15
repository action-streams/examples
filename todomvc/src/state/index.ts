import { Action as BaseAction } from '@action-streams/core';

import { Action } from '/action';

import reducer from './reducer';

export type ID = number;

export interface Item {
  id: ID;
  input: string;
  isCompleted: boolean;
  isEditing: boolean;
  title: string;
}

export enum View {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface State {
  focusedElementId: string;
  input: string;
  items: Item[];
  view: View;
}

export const StateActionType = '/state';
export interface StateAction extends BaseAction {
  payload: State;
  type: typeof StateActionType;
}

export const INITIAL_STATE_ACTION: StateAction = {
  payload: {
    focusedElementId: 'new-todo__input',
    input: '',
    items: [],
    view: View.All,
  },
  type: StateActionType,
};

export const toState = (
  { payload: prevState }: StateAction,
  action: Action
): StateAction => {
  const state: State = reducer(prevState, action);

  if (process.env.MODE === 'development') {
    console.groupCollapsed(action.type);
    console.info('action', action);
    console.info('state', state);
    console.groupEnd();
  }

  return {
    payload: state,
    type: StateActionType,
  };
};
