import { Box, Checkbox, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoSubtask, updateOngoingSubtask, updateCompletedSubtask, taskMove } from "../../redux/reducer";
import './ShowTask.css'

const Showtask = ({ show, setShow, data, currentType }) => {
    const [currentStatus, setCurrentStatus] = useState('');
    const [todoCheckedState, setTodoCheckedState] = useState('');
    const [ongoingCheckedState, setOngoingTodoCheckedState] = useState('');
    const [CompletedCheckedState, setCompletedCheckedState] = useState('');
    const dispatch = useDispatch()


    const handleSelect = (e, type) => {
        setCurrentStatus(e.target.value)
        setShow(false)
        dispatch(taskMove({ id: data?.id, prevStatus: data?.status, currStatus: e.target.value }))
    }

    const InstantCall = () => {
        setTodoCheckedState(data);
        setOngoingTodoCheckedState(data);
        setCompletedCheckedState(data);
        setCurrentStatus(data?.status);
    }

    const handleCheckTodo = (e, ID) => {
        const updateChecked = todoCheckedState.subtask.map((item, i) => item.id === ID ? { ...item, completed: !item.completed } : item);
        dispatch(updateTodoSubtask({ id: data?.id, data: updateChecked }))
        setTodoCheckedState(prev => { return { ...prev, subtask: updateChecked } })
    }

    const handleCheckOngoing = (e, ID) => {
        const updateChecked = ongoingCheckedState.subtask.map((item, i) => item.id === ID ? { ...item, completed: !item.completed } : item);
        dispatch(updateOngoingSubtask({ id: data?.id, data: updateChecked }))
        setOngoingTodoCheckedState(prev => { return { ...prev, subtask: updateChecked } })
    }

    const handleCheckCompleted = (e, ID) => {
        const updateChecked = CompletedCheckedState.subtask.map((item, i) => item.id === ID ? { ...item, completed: !item.completed } : item);
        dispatch(updateCompletedSubtask({ id: data?.id, data: updateChecked }))
        setCompletedCheckedState(prev => { return { ...prev, subtask: updateChecked } })
    }

    useEffect(() => {
        InstantCall();
    }, [data])


    if (currentType === 'todo') {
        return <>
            <Modal
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal_content_box" sx={{ backgroundColor: '#61876E', border: "none", outline: "none" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="task_title">
                        {data?.title}
                    </Typography>
                    <span className="task_description">{todoCheckedState?.description}</span>

                    <div className="subTask_content">
                        <span>subtask ({todoCheckedState?.subtask?.length})</span>
                        {
                            todoCheckedState?.subtask?.length > 0 && todoCheckedState?.subtask.map((item, index) => (<div key={index} className="subtask_control">
                                <label>
                                    <Checkbox checked={Boolean(item.completed)} onChange={(e) => handleCheckTodo(e, item.id)} sx={{
                                        color: "#3C6255",
                                        '&.Mui-checked': {
                                            color: "#3C6255",
                                        },
                                    }} />
                                    <span className={item.completed ? 'checked' : 'unchecked'}>{item.subtask}</span>
                                </label>
                            </div>))
                        }
                    </div>
                    <Box className="form_control" style={{ marginTop: '10px' }}>
                        <label style={{ color: "#fff" }}>status</label>
                        <select value={currentStatus} onChange={(e) => handleSelect(e, 'todo')}>
                            <option >Please select Status</option>
                            <option value='todo'>Todo</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </Box>

                </Box>
            </Modal></>
    } else if (currentType === 'ongoing') {
        return <>
            <Modal
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal_content_box" sx={{ backgroundColor: '#61876E' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="task_title">
                        {ongoingCheckedState?.title}
                    </Typography>
                    <span className="task_description">{ongoingCheckedState?.description}</span>

                    <div className="subTask_content">
                        <span>subtask ({ongoingCheckedState?.subtask?.length})</span>
                        {
                            ongoingCheckedState?.subtask?.length > 0 && ongoingCheckedState?.subtask.map((item, index) => (<div key={index} className="subtask_control">
                                <label>
                                    <Checkbox checked={item.completed} onChange={(e) => handleCheckOngoing(e, item.id)} sx={{
                                        color: "#3C6255",
                                        '&.Mui-checked': {
                                            color: "#3C6255",
                                        },
                                    }} />
                                    <span className={item.completed ? 'checked' : ''}>{item.subtask}</span>
                                </label>
                            </div>))
                        }
                    </div>
                    <Box className="form_control" style={{ marginTop: '10px' }}>
                        <label style={{ color: "#fff" }}>status</label>
                        <select value={currentStatus} onChange={(e) => handleSelect(e, 'ongoing')}>
                            <option >Please select Status</option>
                            <option value='todo'>Todo</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </Box>

                </Box>
            </Modal>
        </>
    } else {
        return <>
            <Modal
                open={show}
                onClose={() => setShow(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal_content_box" sx={{ backgroundColor: '#61876E' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="task_title">
                        {CompletedCheckedState?.title}
                    </Typography>
                    <span className="task_description">{CompletedCheckedState?.description}</span>

                    <div className="subTask_content">
                        <span>subtask({CompletedCheckedState?.subtask?.length})</span>
                        {
                            CompletedCheckedState?.subtask?.length > 0 ? CompletedCheckedState?.subtask.map((item, index) => (<div key={index} className="subtask_control">
                                <label>
                                    <Checkbox checked={item.completed} onChange={(e) => handleCheckCompleted(e, item.id)} sx={{
                                        color: "#3C6255",
                                        '&.Mui-checked': {
                                            color: "#3C6255",
                                        },
                                    }} />
                                    <span className={item.completed ? 'checked' : ''}>{item.subtask}</span>
                                </label>
                            </div>)) : ''
                        }
                    </div>
                    <Box className="form_control" style={{ marginTop: '10px' }}>
                        <label style={{ color: "#fff" }}>status</label>
                        <select value={currentStatus} onChange={(e) => handleSelect(e, 'completed')}>
                            <option >Please select Status</option>
                            <option value='todo'>Todo</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </Box>

                </Box>
            </Modal>
        </>
    }

};

export default Showtask;
