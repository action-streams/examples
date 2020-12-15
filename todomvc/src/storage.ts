import { StorageAction, StorageActionType } from '@action-streams/storage';

import { Item, StateAction } from '/state';

type StorageItem = {
  completed: Item['isCompleted'];
  id: Item['id'];
  title: Item['title'];
};

export interface StorageState {
  items: StorageItem[];
}

export const fromStorage = (action: StorageAction): StorageAction => {
  const storageAction: StorageAction = {
    payload: {
      items: (action.payload as StorageState)?.items.map(
        (storageItem: StorageItem): Item => ({
          id: storageItem.id,
          input: null,
          isCompleted: storageItem.completed,
          isEditing: false,
          title: storageItem.title,
        })
      ),
    },
    type: StorageActionType,
  };

  return storageAction;
};

export const toStorage = (action: StateAction): StorageAction => {
  const storageAction: StorageAction = {
    payload: {
      items: action.payload.items.map(
        (item: Item): StorageItem => ({
          completed: item.isCompleted,
          id: item.id,
          title: item.title,
        })
      ),
    },
    type: StorageActionType,
  };

  return storageAction;
};
