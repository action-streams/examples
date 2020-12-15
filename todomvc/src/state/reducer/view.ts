import { LocationActionType } from '@action-streams/location';

import { Action } from '/action';
import { View } from '/state';

export default (state: View, action: Action): View => {
  switch (action.type) {
    case LocationActionType:
      switch (action.payload.pathname) {
        case '/active':
          return View.Active;
        case '/completed':
          return View.Completed;
        default:
          return View.All;
      }
    default:
      return state;
  }
};
