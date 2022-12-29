import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMove, taskDelete } from "../../../redux/reducer";
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';

import '../Todo/Todo.css'

const Ongoing = ({ setShow, handleShowSubTask }) => {

    const { ongoing } = useSelector(state => state)
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
        handleShowSubTask(ID, 'ongoing');
        setShow(true)
        // dispatch(addMove())
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


    useEffect(() => { }, [ongoing])
    return <Box className="todo">
        <span><SyncIcon /> Ongoing({ongoing.length})</span>
        {
            ongoing?.length > 0 ? ongoing.map((item, index) => (<Box onClick={() => handleTodo(item.id)} key={index} className="task_box">
                <DeleteIcon onClick={(e) => handleDeleteTodo(e, item.id, 'ongoing')} className="delete_icon" />
                <h4>{cutString(item.title)}</h4>
                <span>{countSubtaskChecked(item.subtask)} of {item.subtask.length} subtask</span>
            </Box>)) : (<Box className="task_box no_task">
                <span>No Task Here!</span>
            </Box>)
        }
    </Box>;
};

export default Ongoing;
