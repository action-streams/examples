import { Action, ItemEditActionType } from '/action';

export default (_: string, action: Action): string => {
  switch (action.type) {
    case ItemEditActionType:
      return action.meta ? `${action.meta}__input` : null;
    default:
      return null;
  }
};
