import { action$, scheduler } from '@action-streams/core';
import { location$ } from '@action-streams/location';
import { renderTo } from '@action-streams/vdom';
import { map, mergeArray, runEffects, scan, tap } from '@most/core';

import { INITIAL_STATE_ACTION, toState } from '/state';
import { toVdom } from '/vdom';

const sources$ = mergeArray([action$, location$]);
const state$ = scan(toState, INITIAL_STATE_ACTION, sources$);
const vdom$ = map(toVdom, state$);
const dom$ = tap(renderTo(document.getElementById('app')), vdom$);

runEffects(dom$, scheduler);
