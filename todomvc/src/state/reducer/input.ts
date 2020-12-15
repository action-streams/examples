import { Action, InputActionType, ItemAddActionType } from '/action';

export default (state: string, action: Action): string => {
  switch (action.type) {
    case InputActionType:
      return action.payload;
    case ItemAddActionType:
      return '';
    default:
      return state;
  }
};
