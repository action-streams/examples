import { Item } from '/state';

export const isActive = (item: Item): boolean => !item.isCompleted;
export const isCompleted = (item: Item): boolean => item.isCompleted;
