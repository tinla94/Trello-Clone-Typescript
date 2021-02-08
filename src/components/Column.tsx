import React from 'react';
import { ColumnContainer, ColumnTitle } from 'styles';
import AddNewItem from 'components/AddNewItem';

interface ColumnProps {
    text?: string
    children: React.ReactNode
}

const Column: React.FC<ColumnProps> = ({ text, children }) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={console.log}
                dark
            />
        </ColumnContainer>
    )
}

export default Column;
