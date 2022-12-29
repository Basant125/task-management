import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Todo/Todo.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const Completed = ({ setShow, handleShowSubTask, handleDeleteTodo, setDeleteShow }) => {
    const { completed } = useSelector(state => state);
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
        handleShowSubTask(ID, 'completed');
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

    const handleDelete = (e, id, type) => {
        e.stopPropagation();
        handleDeleteTodo(e, id, type);
        setDeleteShow(true)
    }


    useEffect(() => { }, [completed])
    return <Box className="todo">
        <span><CheckCircleIcon />Completed({completed?.length})</span>
        {
            completed?.length > 0 ? completed.map((item, index) => (<Box onClick={() => handleTodo(item?.id)} key={index} className="task_box">
                <DeleteIcon onClick={(e) => handleDelete(e, item.id, 'completed')} className="delete_icon" />
                <h4>{cutString(item?.title)}</h4>
                <span>{countSubtaskChecked(item.subtask)} of {item?.subtask.length} subtask</span>
            </Box>)) : (<Box className="task_box no_task">
                <span>No Task Here!</span>
            </Box>)
        }
    </Box>;
};

export default Completed;