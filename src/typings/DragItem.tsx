import { ActionTypes} from 'actions/Types';

export type CardDragItem = {
  index: number
  id: string
  columnId: string
  text: string
  type: ActionTypes.CARD
}
export type ColumnDragItem = {
  index: number
  id: string
  text: string
  type: ActionTypes.COLUMN
}

export type DragItem = ColumnDragItem | CardDragItem;