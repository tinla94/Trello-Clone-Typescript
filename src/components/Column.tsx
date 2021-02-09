import React, { useRef } from 'react';
import AddNewItem from 'components/AddNewItem';
import { ColumnContainer, ColumnTitle } from 'styles';
import { useAppState } from 'context/AppStateContext';
import Card from 'components/shared/Card';
import useItemDrag from 'components/features/useItemDrag';
import { useDrop } from 'react-dnd';
import { DragItem } from 'typings/DragItem';
import { isHidden } from 'utils/isHidden';
import { ActionTypes } from 'actions/Types';

interface ColumnProps {
    text: string;
    index: number;
    id: string;
    isPreview?: boolean;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: [
            ActionTypes.COLUMN, 
            ActionTypes.CARD
        ],
        hover(item: DragItem) {
            if (item.type === ActionTypes.COLUMN) {
                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                dispatch({ type: ActionTypes.MOVE_LIST, payload: { dragIndex, hoverIndex } });
                item.index = hoverIndex;
            } else {
                const dragIndex = item.index;
                const hoverIndex = 0;
                const sourceColumn = item.columnId;
                const targetColumn = id;

                if (sourceColumn === targetColumn) {
                    return;
                }

                dispatch({
                    type: ActionTypes.MOVE_TASK,
                    payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
                });

                item.index = hoverIndex;
                item.columnId = targetColumn;
            }
        },
    });

    const { drag } = useItemDrag({ 
        type: ActionTypes.COLUMN, 
        id, 
        index, 
        text 
    });

    drag(drop(ref));

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(
                isPreview, 
                state.draggedItem, 
                ActionTypes.COLUMN, 
                id)
            }
        >
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card
                    text={task.text}
                    key={task.id}
                    index={i}
                    id={task.id}
                    columnId={id}
                />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={(text) =>
                    dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })
                }
                dark
            />
        </ColumnContainer>
    );
};