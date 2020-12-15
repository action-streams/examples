import { StorageActionType } from '@action-streams/storage';

import {
  Action,
  ItemAddActionType,
  ItemEditActionType,
  ItemRemoveActionType,
  ItemInputActionType,
  ItemToggleActionType,
  ItemUpdateActionType,
  ItemsRemoveActionType,
  ItemsToggleActionType,
} from '/action';
import { Item, State } from '/state';

export default (state: Item[], action: Action): Item[] => {
  switch (action.type) {
    case ItemAddActionType:
      return [
        ...state,
        {
          id: new Date().getTime(),
          input: null,
          isCompleted: false,
          isEditing: false,
          title: action.payload,
        },
      ];
    case ItemEditActionType:
      return state.map((item) => ({
        ...item,
        input: item.id === action.meta ? item.title : item.input,
        isEditing: item.id === action.meta,
      }));
    case ItemInputActionType:
      return state.map((item) => {
        if (item.id === action.meta) {
          return {
            ...item,
            input: action.payload,
          };
        }

        return item;
      });
    case ItemRemoveActionType:
      return state.filter((item) => item.id !== action.meta);
    case ItemToggleActionType:
      return state.map((item) => {
        if (item.id === action.meta) {
          return {
            ...item,
            isCompleted: action.payload,
          };
        }

        return item;
      });
    case ItemUpdateActionType:
      return state.map((item) => {
        if (item.id === action.meta && item.isEditing) {
          return {
            ...item,
            input: null,
            isEditing: false,
            title: action.payload,
          };
        }

        return item;
      });
    case ItemsRemoveActionType:
      return state.filter((item) => !action.meta.includes(item.id));
    case ItemsToggleActionType:
      return state.map((item) => ({
        ...item,
        isCompleted: action.payload,
      }));
    case StorageActionType:
      return (action.payload as Pick<State, 'items'>)?.items ?? state;
    default:
      return state;
  }
};
