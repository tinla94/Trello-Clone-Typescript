import { useEffect, useContext } from 'react';
import { DragItem } from 'typings/DragItem';
import React, { createContext, useReducer } from 'react';
import { appStateReducer } from 'reducers/AppReducers';
import { Action } from 'actions/Types';
import { withData } from 'withData';
import { save } from 'api';

interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[]
    draggedItem?: DragItem
}

// const appData: AppState = {
//     lists: [
//         {
//             id: "0",
//             text: "To Do",
//             tasks: [{ id: "c0", text: "Generate app scaffold" }]
//         },
//         {
//             id: "1",
//             text: "In Progress",
//             tasks: [{ id: "c2", text: "Learn Typescript" }]
//         },
//         {
//             id: "2",
//             text: "Done",
//             tasks: [{ id: "c3", text: "Begin to use static typing" }]
//         }
//     ]
// }

export const AppStateProvider = withData(
    ({
        children,
        initialState,
    }: React.PropsWithChildren<{ initialState: AppState }>) => {
        const [state, dispatch] = useReducer(appStateReducer, initialState);

        useEffect(() => {
            save(state);
        }, [state]);

        return (
            <AppStateContext.Provider value={{ state, dispatch }}>
                {children}
            </AppStateContext.Provider>
        );
    }
);

export const useAppState = () => {
    return useContext(AppStateContext);
};