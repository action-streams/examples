import { combineReducers } from '@action-streams/state';

import { State } from '/state';

import focusedElementId from './focusedElementId';
import input from './input';
import items from './items';
import view from './view';

export default combineReducers<State>({
  focusedElementId,
  input,
  items,
  view,
});
