import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { createRef, useEffect, useRef, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import './AddTask.css'
import { useDispatch } from "react-redux";
import { addTaskTodo, addTaskOngoing, addTaskCompleted } from "../../redux/reducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ handleClose, open }) => {
    const [subTask, setSubTask] = useState([]);
    const [task, setTask] = useState({ id: '', title: '', description: '', subtask: [], status: '' });
    const dispatch = useDispatch();


    const AddSubTask = () => {
        setSubTask(prev => [...prev, { id: Date.now(), subtask: '', completed: false }])
    }

    const DeleteSubTask = (value) => {
        // if (subTask.length !== 1) {
        const filterSubTask = subTask.filter((_, index) => index !== value);
        setSubTask(filterSubTask)
        // }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => { return { ...prev, id: Date.now(), [name]: value } })
    }

    const handleSelect = (e) => {
        setTask(prev => { return { ...prev, status: e.target.value } })
    }

    const changeSubTask = (e, id) => {
        const updateInput = subTask.map((item, index) => index === id ? { ...item, [e.target.name]: e.target.value } : item);
        setSubTask(updateInput);
    }


    const handleAddTask = () => {
        if (!task.status || !task.title) {
            // handleClose(false);
            toast.warn("Please Fill The Field !", {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if (task.status && task.status === 'todo') {
            dispatch(addTaskTodo({ ...task, subtask: subTask.length > 0 ? subTask : '' }))
        } else if (task.status && task.status === 'ongoing') {
            dispatch(addTaskOngoing({ ...task, subtask: subTask.length > 0 ? subTask : '' }))
        } else {
            dispatch(addTaskCompleted({ ...task, subtask: subTask.length > 0 ? subTask : '' }))
        }

        setTask({ id: '', title: '', description: '', subtask: [], status: '' })
        setSubTask([{ id: 1, subtask: '', completed: false }])
        handleClose(false);
    }

    useEffect(() => {
    }, [subTask])

    return <Modal
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className="modal_content_box">
            <Typography id="modal-modal-title" variant="h6" component="h2" color="#fff" sx={{ fontWeight: "600" }}>
                Add New Task
            </Typography>
            <form className="addtask_form">
                <Box className="form_control">
                    <label>title</label>
                    <input type="text" placeholder="eg. Take coffee break" name="title" value={task.title || ''} onChange={handleChange} />
                </Box>
                <Box className="form_control">
                    <label>description</label>
                    <textarea type="text" placeholder="eg. It's always good to take a break" name="description" value={task.description || ''} onChange={handleChange} />
                </Box>
                <Box className="form_control_subtask">
                    <label>subtask</label>
                    {
                        subTask.length > 0 && (subTask.map((item, index) => <Box key={index} className="sub_task_control">
                            <input type="text" placeholder="eg. Make Coffee" onChange={(e) => changeSubTask(e, index)} name='subtask' />
                            <ClearIcon onClick={() => DeleteSubTask(index)} style={{ cursor: "pointer", color: "#fff" }} />
                        </Box>)
                        )
                    }

                    <Button variant="contained" className="task_btn" onClick={() => AddSubTask()}>+ Add Subtask</Button>
                </Box>
                <Box className="form_control" style={{ marginTop: '10px' }}>
                    <label>status</label>
                    <select onChange={handleSelect}>
                        <option >Please select Status</option>
                        <option value='todo'>Todo</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </Box>
                <Button variant="contained" className="task_btn" onClick={handleAddTask}>+ Create Task</Button>
            </form>

        </Box>
    </Modal>;
};

export default AddTask;
