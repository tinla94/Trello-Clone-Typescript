import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { CustomDragLayerContainer } from 'styles';
import { Column } from 'components/Column';


function getItemStyles(currentOFfset: XYCoord | null): React.CSSProperties {
    if (!currentOFfset) return { display: "none" };

    const { x, y } = currentOFfset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    }
}

const CustomDragLayer: React.FC = () => {
    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }))

    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
            </div>
        </CustomDragLayerContainer>
    ) : null
};

export default CustomDragLayer;