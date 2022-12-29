import React, { createContext, useReducer } from 'react'

const initialState = {
    todo: [{ id: 1, task: "create ui/ux", subtask: ["first sub task", "second sub task", "third sub task"] }]
}
export const TaskContext = createContext();
function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK': {
            return
        }
        case 'RESET': {
            return;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const value = { state, dispatch }
    return <TaskContext.Provider value={value}>
        {children}
    </TaskContext.Provider>
}