import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteTask from "../DeleteTask/DeleteTask";
import Showtask from "../ShowTask/Showtask";
import Completed from "./Completed/Completed";
import Ongoing from "./Ongoing/Ongoing";
import './Task.css'
import Todo from "./Todo/Todo";
const Task = () => {
    const [show, setShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [currentType, setCurrentType] = useState('');
    const [deleteData, setDeleteData] = useState({})
    const [data, setData] = useState([]);
    const dispatch = useDispatch()
    const { todo, ongoing, completed } = useSelector(state => state)


    const handleShowSubTask = (id, type) => {
        setCurrentType(type)
        if (type === 'todo') {
            setData(...todo.filter(item => item.id === id))
        } else if (type === 'ongoing') {
            setData(...ongoing.filter(item => item.id === id))
        } else {
            setData(...completed.filter(item => item.id === id))
        }
    }

    const handleDeleteTodo = (e, id, type) => {
        setDeleteData({ e, id, type })
    }

    useEffect(() => {

    }, [])
    return <>
        <div className="task_container">
            <Box>
                <Todo handleShowSubTask={handleShowSubTask} setShow={setShow} handleDeleteTodo={handleDeleteTodo} setDeleteShow={setDeleteShow} />
            </Box>
            <Box>
                <Ongoing handleShowSubTask={handleShowSubTask} setShow={setShow} handleDeleteTodo={handleDeleteTodo} setDeleteShow={setDeleteShow} />
            </Box>
            <Box>
                <Completed handleShowSubTask={handleShowSubTask} setShow={setShow} handleDeleteTodo={handleDeleteTodo} setDeleteShow={setDeleteShow} />
            </Box>
        </div>
        <Box>
            <Showtask show={show} setShow={setShow} data={data} currentType={currentType} />
        </Box>
        <Box>
            <DeleteTask deleteShow={deleteShow} setDeleteShow={setDeleteShow} deleteData={deleteData} />
        </Box>
    </>
};

export default Task;
