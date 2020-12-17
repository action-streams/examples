import { LocationActionType } from '@action-streams/location';

import { Action } from '/action';

export default (state: string, action: Action): string => {
  switch (action.type) {
    case LocationActionType:
      return action.payload.pathname;
    default:
      return state;
  }
};
