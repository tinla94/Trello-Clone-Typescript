import uuid from 'uuid';
import { nanoid } from 'nanoid';
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
                    {
                        id: nanoid(),
                        text: action.payload,
                        tasks: []
                    },
                ],
            }
        }
        case ActionTypes.ADD_TASK: {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.listId
            )
            state.lists[targetLaneIndex].tasks.push({
                id: nanoid(),
                text: action.payload.text,
            })

            return { ...state }
        }
        case ActionTypes.MOVE_LIST: {
            const { dragIndex, hoverIndex } = action.payload
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return { ...state }
        }
        case ActionTypes.SET_DRAGGED_ITEM: {
            return {
                ...state,
                draggedItem: action.payload
            }
        }
        case ActionTypes.MOVE_TASK: {
            const {
                dragIndex,
                hoverIndex,
                sourceColumn,
                targetColumn
            } = action.payload

            const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
            const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]

            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
            return { ...state }
        }
        default: {
            return state
        }
    }
}