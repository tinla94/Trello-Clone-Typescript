import React from 'react';
import { ColumnContainer, ColumnTitle } from 'styles';

interface ColumnProps {
    text?: string
    children: React.ReactNode
}

const Column: React.FC<ColumnProps> = ({ text, children }) => {
    return (
        <ColumnContainer>
            <ColumnTitle>
                {text}
            </ColumnTitle>
            {children}
        </ColumnContainer>
    )
}

export default Column;
