import React from 'react';
import { useAppState } from 'context/AppStateContext';
import { AppContainer } from 'styles';
import { Column } from 'components/Column';
import AddNewItem from 'components/AddNewItem';
import { ActionTypes } from 'actions/Types';
import CustomerDragLayer from 'components/shared/CusomDragLayer';

function App() {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomerDragLayer />
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch({
          type: ActionTypes.ADD_LIST,
          payload: text
        })}
      />
    </AppContainer>
  )
}

export default App;
