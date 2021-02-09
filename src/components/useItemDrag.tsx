import { useDrag } from 'react-dnd';
import { ActionTypes } from 'actions/Types';
import { useAppState } from 'context/AppStateContext';
import { DragItem } from 'components/DragItem';

const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    const [, drag] = useDrag({
        item,
        begin: () =>
            dispatch({
                type: ActionTypes.SET_DRAGGED_ITEM,
                payload: item
            }),
        end: () => dispatch({
            type: ActionTypes.SET_DRAGGED_ITEM, 
            payload: undefined
        })
    })
    return { drag }
}

export default useItemDrag
