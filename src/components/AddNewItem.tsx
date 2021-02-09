import React, { useState } from 'react';
import NewItemForm from 'components/NewItemForm';
import { AddItemButton } from 'styles';

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
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton 
      dark={dark} 
      onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
}

export default AddNewItem
