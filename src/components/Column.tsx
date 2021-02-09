import React, { useState, useRef } from 'react';
import { ColumnContainer, ColumnTitle } from 'styles';
import AddNewItem from 'components/AddNewItem';
import Card from 'components/Card';
import { useAppState } from 'context/AppStateContext';
import useItemDrag from "components/useItemDrag";
import { useDrop } from 'react-dnd';
import { DragItem } from './DragItem';
import { isHidden } from 'utils/isHidden';

interface ColumnProps {
    text?: string
    id: string
    index: any
}

const Column: React.FC<ColumnProps> = ({ text, index, id }) => {
    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null); 
    const { drag } = useItemDrag({ type: "COLUMN", id, index, text });
    const [, drop] = useDrop({
        accept: "COLUMN",
        hover(item: DragItem) {
          const dragIndex = item.index
          const hoverIndex = index
    
          if (dragIndex === hoverIndex) {
            return
          }
    
          dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } 
    })
          item.index = hoverIndex
        }
      })

    // drag 
    drag(drop(ref));

    return (
        <ColumnContainer 
            isHidden={isHidden(state.draggedItem, "COLUMN", id)}
            ref={ref}>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                // @ts-ignore
                <Card text={task.text} key={task.id} index={i} />
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={text =>
                    dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })
                }
                dark
            />
        </ColumnContainer>
    )
}

export default Column;
