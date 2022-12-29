import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todo: [],
    ongoing: [],
    completed: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTaskTodo: (state, action) => {
            state.todo.push(action.payload)
        },
        updateTodoSubtask: (state, action) => {
            const updateTodo = state.todo.map(item => item.id === action.payload.id ? { ...item, subtask: action.payload.data } : item);
            state.todo = updateTodo;
        },
        addTaskOngoing: (state, action) => {
            state.ongoing.push(action.payload)
        },
        updateOngoingSubtask: (state, action) => {
            const updateOngoing = state.ongoing.map(item => item.id === action.payload.id ? { ...item, subtask: action.payload.data } : item);
            state.ongoing = updateOngoing;
        },
        addTaskCompleted: (state, action) => {
            state.completed.push(action.payload)
        },

        updateCompletedSubtask: (state, action) => {
            const updateCompleted = state.completed.map(item => item.id === action.payload.id ? { ...item, subtask: action.payload.data } : item);
            state.completed = updateCompleted;
        },

        taskMove: (state, action) => {
            if (action.payload.currStatus === action.payload.prevStatus) return;
            if (action.payload.prevStatus === 'todo' && (action.payload.currStatus === 'ongoing' || action.payload.currStatus === 'completed')) {
                let findItem = state.todo.find(item => item.id === action.payload.id);
                let findIndex = state.todo.findIndex(item => item.id === action.payload.id);
                // let updateSubtask = findItem.subtask.map(item => { return { ...item, completed: false } })
                findItem.status = action.payload.currStatus
                state.todo.splice(findIndex, 1)
                if (action.payload.currStatus === 'ongoing') {
                    state.ongoing.push(findItem)
                } else {
                    state.completed.push(findItem)
                }
            } else if (action.payload.prevStatus === 'ongoing' && (action.payload.currStatus === 'todo' || action.payload.currStatus === 'completed')) {
                let findItem = state.ongoing.find(item => item.id === action.payload.id);
                let findIndex = state.ongoing.findIndex(item => item.id === action.payload.id);
                findItem.status = action.payload.currStatus
                state.ongoing.splice(findIndex, 1)
                if (action.payload.currStatus === 'todo') {
                    state.todo.push(findItem)
                } else {
                    state.completed.push(findItem)
                }
            } else if (action.payload.prevStatus === 'completed' && (action.payload.currStatus === 'todo' || action.payload.currStatus === 'ongoing')) {
                let findItem = state.completed.find(item => item.id === action.payload.id);
                let findIndex = state.completed.findIndex(item => item.id === action.payload.id);
                findItem.status = action.payload.currStatus
                state.completed.splice(findIndex, 1)
                if (action.payload.currStatus === 'ongoing') {
                    state.ongoing.push(findItem)
                } else {
                    state.todo.push(findItem)
                }
            } else {
                return;
            }
        },
        taskDelete: (state, action) => {
            if (action.payload.type === 'todo') {
                const filterTodo = state.todo.filter(item => item.id !== action.payload.id);
                state.todo = filterTodo
            } else if (action.payload.type === 'ongoing') {
                const filterTodo = state.ongoing.filter(item => item.id !== action.payload.id);
                state.ongoing = filterTodo
            } else {
                const filterTodo = state.completed.filter(item => item.id !== action.payload.id);
                state.completed = filterTodo
            }
        },
        addMove: (state, action) => {
            state.todo = []
            state.ongoing = []
            state.completed = []

        },
    },
})

// Action creators are generated for each case reducer function
export const { addTaskTodo, addTaskOngoing, addTaskCompleted, addMove, updateTodoSubtask, updateOngoingSubtask, updateCompletedSubtask, taskMove, taskDelete } = taskSlice.actions

export default taskSlice.reducer