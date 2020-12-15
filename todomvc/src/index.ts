import { action$, bySuccess, scheduler } from '@action-streams/core';
import { location$ } from '@action-streams/location';
import { readFrom, writeTo } from '@action-streams/storage';
import { renderTo } from '@action-streams/vdom';
import {
  continueWith,
  filter,
  map,
  mergeArray,
  multicast,
  runEffects,
  scan,
  tap,
} from '@most/core';

import { INITIAL_STATE_ACTION, toState } from '/state';
import { fromStorage, toStorage } from '/storage';
import { toVdom } from '/vdom';

const LOCALSTORAGE_KEY = 'todos-@action-streams';

const storageRead$ = filter(bySuccess, readFrom(LOCALSTORAGE_KEY));
const sources$ = continueWith(
  () => mergeArray([action$, location$]),
  map(fromStorage, storageRead$)
);
const state$ = multicast(scan(toState, INITIAL_STATE_ACTION, sources$));
const storageWrite$ = tap(writeTo(LOCALSTORAGE_KEY), map(toStorage, state$));
const vdom$ = map(toVdom, state$);
const dom$ = tap(renderTo(document.getElementById('app')), vdom$);

runEffects(storageWrite$, scheduler);
runEffects(dom$, scheduler);
