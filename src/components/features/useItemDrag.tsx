import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ActionTypes } from 'actions/Types';
import { useAppState } from 'context/AppStateContext';
import { DragItem } from 'typings/DragItem';
import { getEmptyImage } from 'react-dnd-html5-backend';


export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    const [, drag, preview] = useDrag({
        item,
        begin: () =>
            dispatch({
                type: ActionTypes.SET_DRAGGED_ITEM,
                payload: item,
            }),
        end: () => dispatch({ 
            type: ActionTypes.SET_DRAGGED_ITEM, 
            payload: undefined 
        }),
    })
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview])
    return { drag }
};