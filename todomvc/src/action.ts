import { Action as BaseAction } from '@action-streams/core';
import { LocationAction } from '@action-streams/location';
import { StorageAction } from '@action-streams/storage';

import { ID, Item } from '/state';

export const InputActionType = 'input';
export interface InputAction extends BaseAction {
  payload: string;
  type: typeof InputActionType;
}

export const ItemAddActionType = 'item-add';
export interface ItemAddAction extends BaseAction {
  payload: string;
  type: typeof ItemAddActionType;
}

export const ItemEditActionType = 'item-edit';
export interface ItemEditAction extends BaseAction {
  payload: Item;
  type: typeof ItemEditActionType;
}

export const ItemInputActionType = 'item-input';
export interface ItemInputAction extends BaseAction {
  payload: string;
  type: typeof ItemInputActionType;
}

export const ItemRemoveActionType = 'item-remove';
export interface ItemRemoveAction extends BaseAction {
  meta: ID;
  type: typeof ItemRemoveActionType;
}

export const ItemUpdateActionType = 'item-update';
export interface ItemUpdateAction extends BaseAction {
  meta: ID;
  payload: string;
  type: typeof ItemUpdateActionType;
}

export const ItemToggleActionType = 'item-toggle';
export interface ItemToggleAction extends BaseAction {
  meta: ID;
  payload: boolean;
  type: typeof ItemToggleActionType;
}

export const ItemsRemoveActionType = 'items-remove';
export interface ItemsRemoveAction extends BaseAction {
  meta: ID[];
  type: typeof ItemsRemoveActionType;
}

export const ItemsToggleActionType = 'items-toggle';
export interface ItemsToggleAction extends BaseAction {
  payload: boolean;
  type: typeof ItemsToggleActionType;
}

export type Action =
  | InputAction
  | ItemAddAction
  | ItemEditAction
  | ItemInputAction
  | ItemRemoveAction
  | ItemUpdateAction
  | ItemToggleAction
  | ItemsRemoveAction
  | ItemsToggleAction
  | LocationAction
  | StorageAction;
