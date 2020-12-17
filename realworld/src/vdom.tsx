import { jsx, Vdom, VdomAction, VdomActionType } from '@action-streams/vdom';

import { StateAction } from '/state';

export const toVdom = (action: StateAction): VdomAction => {
  const state = action.payload;

  state;

  const vdom: Vdom = <h1>hello, world!</h1>;

  const vdomAction: VdomAction = {
    payload: vdom,
    type: VdomActionType,
  };

  return vdomAction;
};
