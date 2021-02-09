import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from 'context/AppStateContext';
import { CardContainer } from 'styles';
import { useItemDrag } from 'components/features/useItemDrag';
import { CardDragItem } from 'typings/DragItem';
import { ActionTypes } from 'actions/Types';

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

const Card: React.FC<CardProps> = ({ text, id, index, columnId }) => {
  const { dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ActionTypes.CARD,
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: ActionTypes.MOVE_TASK,
        payload: { 
          dragIndex, 
          hoverIndex, 
          sourceColumn, 
          targetColumn 
        },
      });

      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });


  const { drag } = useItemDrag({
    type: ActionTypes.CARD,
    id,
    index,
    text,
    columnId
  });

  drag(drop(ref));

  return <CardContainer ref={ref}>{text}</CardContainer>;
}

export default Card
