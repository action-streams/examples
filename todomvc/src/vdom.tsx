import { createAction } from '@action-streams/core';
import { jsx, Vdom, VdomAction, VdomActionType } from '@action-streams/vdom';
import clsx from 'clsx';

import {
  InputActionType,
  ItemAddActionType,
  ItemEditActionType,
  ItemInputActionType,
  ItemRemoveActionType,
  ItemToggleActionType,
  ItemUpdateActionType,
  ItemsRemoveActionType,
  ItemsToggleActionType,
} from '/action';
import { StateAction, View } from '/state';
import { isActive, isCompleted } from '/utils';

import '/styles.css';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';
const MAX_LENGTH = 255;

export const toVdom = (action: StateAction): VdomAction => {
  const state = action.payload;

  const activeItems = state.items.filter(isActive);
  const completedItems = state.items.filter(isCompleted);
  const filteredItems = state.items.filter((item) => {
    switch (state.view) {
      case View.Active:
        return isActive(item);
      case View.Completed:
        return isCompleted(item);
      default:
        return true;
    }
  });

  const vdom: Vdom = (
    <section className="todoapp">
      {[
        <header className="header">
          {[
            <h1>todos</h1>,
            <input
              autofocus={true}
              className="new-todo"
              focused={state.focusedElementId === 'new-todo__input'}
              id="new-todo__input"
              maxLength={MAX_LENGTH}
              onblur={(event: FocusEvent) => {
                const value = (event.target as HTMLInputElement).value.trim();

                if (value) {
                  createAction({
                    payload: value,
                    type: ItemAddActionType,
                  });
                }
              }}
              oninput={(event: InputEvent) => {
                const value = (event.target as HTMLInputElement).value;

                createAction({
                  payload: value,
                  type: InputActionType,
                });
              }}
              onkeydown={(event: KeyboardEvent) => {
                const value = (event.target as HTMLInputElement).value.trim();

                if (event.key === ENTER_KEY && value) {
                  createAction({
                    payload: value,
                    type: ItemAddActionType,
                  });
                }
              }}
              placeholder="What needs to be done?"
              value={state.input}
            />,
          ]}
        </header>,
        <div className="main" hidden={state.items.length === 0}>
          {[
            <input
              checked={activeItems.length === 0}
              className="toggle-all"
              id="toggle-all"
              onchange={() => {
                createAction({
                  payload: activeItems.length !== 0,
                  type: ItemsToggleActionType,
                });
              }}
              type="checkbox"
            />,
            <label htmlFor="toggle-all">Mark all as complete</label>,
            <ul className="todo-list">
              {filteredItems.map((item) => (
                <li
                  className={clsx({
                    completed: item.isCompleted,
                    editing: item.isEditing,
                  })}
                  dataId={item.id}
                >
                  {[
                    <div className="view">
                      {[
                        <input
                          className="toggle"
                          checked={item.isCompleted}
                          onchange={() => {
                            createAction({
                              meta: item.id,
                              payload: !item.isCompleted,
                              type: ItemToggleActionType,
                            });
                          }}
                          type="checkbox"
                        />,
                        <label
                          ondblclick={() => {
                            createAction({
                              meta: item.id,
                              type: ItemEditActionType,
                            });
                          }}
                        >
                          {item.title}
                        </label>,
                        <button
                          className="destroy"
                          onclick={() => {
                            createAction({
                              meta: item.id,
                              type: ItemRemoveActionType,
                            });
                          }}
                          type="button"
                        />,
                      ]}
                    </div>,
                    <input
                      className="edit"
                      focused={state.focusedElementId === `${item.id}__input`}
                      hidden={!item.isEditing}
                      id={`${item.id}__input`}
                      onblur={(event: FocusEvent) => {
                        const value = (event.target as HTMLInputElement).value.trim();

                        if (value) {
                          createAction({
                            meta: item.id,
                            payload: value,
                            type: ItemUpdateActionType,
                          });
                        } else {
                          createAction({
                            meta: item.id,
                            type: ItemRemoveActionType,
                          });
                        }
                      }}
                      oninput={(event: InputEvent) => {
                        const value = (event.target as HTMLInputElement).value;

                        createAction({
                          meta: item.id,
                          payload: value,
                          type: ItemInputActionType,
                        });
                      }}
                      onkeydown={(event: KeyboardEvent) => {
                        switch (event.key) {
                          case ENTER_KEY:
                            {
                              const value = (event.target as HTMLInputElement).value.trim();

                              if (value) {
                                createAction({
                                  meta: item.id,
                                  payload: value,
                                  type: ItemUpdateActionType,
                                });
                              } else {
                                createAction({
                                  meta: item.id,
                                  type: ItemRemoveActionType,
                                });
                              }
                            }
                            break;
                          case ESCAPE_KEY:
                            createAction({
                              meta: null,
                              type: ItemEditActionType,
                            });
                            break;
                        }
                      }}
                      value={item.input}
                    />,
                  ]}
                </li>
              ))}
            </ul>,
          ]}
        </div>,
        <footer className="footer" hidden={state.items.length === 0}>
          {[
            <span className="todo-count">
              {[
                <strong>{activeItems.length}</strong>,
                ` ${activeItems.length === 1 ? 'item' : 'items'} left`,
              ]}
            </span>,
            <ul className="filters">
              {[
                <li>
                  <a
                    className={clsx({
                      selected: state.view === View.All,
                    })}
                    href="#/"
                  >
                    All
                  </a>
                </li>,
                <li>
                  <a
                    className={clsx({
                      selected: state.view === View.Active,
                    })}
                    href="#/active"
                  >
                    Active
                  </a>
                </li>,
                <li>
                  <a
                    className={clsx({
                      selected: state.view === View.Completed,
                    })}
                    href="#/completed"
                  >
                    Completed
                  </a>
                </li>,
              ]}
            </ul>,
            <button
              className="clear-completed"
              hidden={completedItems.length === 0}
              onclick={() => {
                createAction({
                  meta: completedItems.map((item) => item.id),
                  type: ItemsRemoveActionType,
                });
              }}
              type="button"
            >
              Clear completed
            </button>,
          ]}
        </footer>,
      ]}
    </section>
  );

  const vdomAction: VdomAction = {
    payload: vdom,
    type: VdomActionType,
  };

  return vdomAction;
};
