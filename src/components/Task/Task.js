import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Showtask from "../ShowTask/Showtask";
import Completed from "./Completed/Completed";
import Ongoing from "./Ongoing/Ongoing";
import './Task.css'
import Todo from "./Todo/Todo";
const Task = () => {
    const [show, setShow] = useState(false);
    const [currentType, setCurrentType] = useState('');
    const [data, setData] = useState([]);

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

    useEffect(() => {

    }, [])
    return <>
        <div className="task_container">
            <Box>
                <Todo handleShowSubTask={handleShowSubTask} setShow={setShow} />
            </Box>
            <Box>
                <Ongoing handleShowSubTask={handleShowSubTask} setShow={setShow} />
            </Box>
            <Box>
                <Completed handleShowSubTask={handleShowSubTask} setShow={setShow} />
            </Box>
        </div>
        <Box>
            <Showtask show={show} setShow={setShow} data={data} currentType={currentType} />
        </Box>
    </>
};

export default Task;
