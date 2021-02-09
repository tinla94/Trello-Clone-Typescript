import { DragItem } from "typings/DragItem";

export enum ActionTypes {
    ADD_LIST = "ADD_LIST",
    ADD_TASK = "ADD_TASK",
    MOVE_LIST = "MOVE_LIST",
    MOVE_TASK = 'MOVE_TASK',
    SET_DRAGGED_ITEM = "SET_DRAGGED_ITEM",
    COLUMN = "COLUMN",
    CARD = "CARD"
}

export type Action =
    | {
        type: ActionTypes.ADD_LIST
        payload: string
    }
    | {
        type: ActionTypes.ADD_TASK
        payload: { text: string; taskId: string }
    }
    | {
        type: ActionTypes.MOVE_LIST
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
    | {
        type: ActionTypes.SET_DRAGGED_ITEM
        payload: DragItem | undefined
    }