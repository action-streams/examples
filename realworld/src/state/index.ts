import { Action as BaseAction } from '@action-streams/core';

import { Action } from '/action';

import reducer from './reducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {
  route: string;
}

export const StateActionType = '/state';
export interface StateAction extends BaseAction {
  payload: State;
  type: typeof StateActionType;
}

export const INITIAL_STATE_ACTION: StateAction = {
  payload: {
    route: '/',
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
