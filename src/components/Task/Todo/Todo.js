import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Showtask from "../../ShowTask/Showtask";
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import './Todo.css'
import { taskDelete } from "../../../redux/reducer";

const Todo = ({ setShow, handleShowSubTask }) => {
    const { todo } = useSelector(state => state);
    const [checkedCount, setCheckedCount] = useState(0);
    const dispatch = useDispatch()

    const cutString = (str) => {
        if (str?.length > 40) {
            const newStr = str.substr(0, 40);
            return newStr + ' ' + "..."
        } else {
            return str
        }
    }

    const handleTodo = (ID) => {
        handleShowSubTask(ID, 'todo');
        setShow(true)
    }

    const countSubtaskChecked = (subtask) => {
        if (subtask?.length > 0) {
            let count = 0;
            subtask.map(item => {
                if (item.completed) {
                    count += 1
                }
            })
            return count
        } else {
            return 0
        }
    }

    const handleDeleteTodo = (e, id, type) => {
        e.stopPropagation();
        dispatch(taskDelete({ id, type }))
    }

    useEffect(() => { }, [todo])
    return <Box className="todo">
        <span ><ListAltIcon />Todo({todo.length})</span>
        {
            todo?.length > 0 ? todo.map((item, index) => (<Box onClick={() => handleTodo(item.id)} key={index} className="task_box">
                <DeleteIcon onClick={(e) => handleDeleteTodo(e, item.id, 'todo')} className="delete_icon" />
                <h4>{cutString(item.title)}</h4>
                <span>{countSubtaskChecked(item.subtask)} of {item.subtask.length} subtask</span>
            </Box>)) : (<Box className="task_box no_task">
                <span>No Task Here!</span>
            </Box>)
        }
    </Box>;
};

export default Todo;
