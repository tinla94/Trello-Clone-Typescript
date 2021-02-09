import uuid from 'uuid';
import { moveItem } from 'utils/moveItem';
import { findItemIndexById } from 'utils/findItemIndexById';
import { AppState } from 'context/AppStateContext';
import { Action, ActionTypes } from 'actions/Types';

export const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.ADD_LIST: {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    // @ts-ignore
                    { id: uuid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case ActionTypes.ADD_TASK: {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )
            state.lists[targetLaneIndex].tasks.push({
                // @ts-ignore
                id: uuid(),
                text: action.payload.text
            })

            return {
                ...state
            }
        }
        case ActionTypes.MOVE_LIST: {
            const { dragIndex, hoverIndex } = action.payload;
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {
                ...state
            }
        }
        case ActionTypes.SET_DRAGGED_ITEM: {
            return {
                ...state,
                draggedItem: action.payload
            }
        }
        default: {
            return state
        }
    }
}