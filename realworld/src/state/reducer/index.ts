import { combineReducers } from '@action-streams/state';

import { State } from '/state';

import route from './route';

export default combineReducers<State>({
  route,
});
