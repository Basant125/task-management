import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import './DeleteTask.css'
import deleteIcon from '../../assests/deleteIcon.png'
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { taskDelete } from "../../redux/reducer";

const DeleteTask = ({ deleteShow, setDeleteShow, deleteData }) => {

    const dispatch = useDispatch()

    const deleteTask = () => {
        // deleteData?.e.stopPropagation();
        const ID = deleteData.id;
        const type = deleteData.type;
        dispatch(taskDelete({ id: ID, type }))
        setDeleteShow(false)
    }
    return <Dialog
        open={deleteShow}
        // onClose={() => setDeleteShow(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <Box className="dialog_content_box">
            <DialogTitle id="alert-dialog-title" className="dialog_title" >
                <img src={deleteIcon} alt="delete icon" />
            </DialogTitle>
            <DialogContent className="dialog_content">
                <h4>Delete Task</h4>
                <span>Are you sure want to delete ?</span>
            </DialogContent>
            <DialogActions className="delete_btn_dialog">
                <Button onClick={deleteTask} className="delete_btn">Delete</Button>
                <Button autoFocus className="delete_btn cancel_btn" onClick={() => setDeleteShow(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </Box>
    </Dialog>;
};

export default DeleteTask;
