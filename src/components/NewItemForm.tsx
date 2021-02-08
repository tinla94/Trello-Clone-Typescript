import React, { useState } from 'react';
import { NewItemFormContainer, NewItemInput, NewItemButton } from 'styles';

interface NewItemFormProps {
    onAdd(text: string): void
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onAdd }) => {
    const [text, setText] = useState("");

    return (
        <NewItemFormContainer>
            <NewItemInput
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}

export default NewItemForm
