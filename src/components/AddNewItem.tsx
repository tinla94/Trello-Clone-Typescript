import React, { useState } from 'react';
import NewItemForm from 'components/NewItemForm';

interface AddItemsProps {
    onAdd(text: string): void
    toggleButtonText: string
    dark?: boolean
}

const AddNewItem: React.FC<AddItemsProps> = ({ onAdd, toggleButtonText, dark }) => {
    const [showForm, setShowForm] = useState(false);

    if (showForm) {
        return (
          <NewItemForm
            onAdd={text => {
              onAdd(text)
              setShowForm(false)
            }}
          />
        )
      }
    
    return (
        <button onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </button>
    )
}

export default AddNewItem
